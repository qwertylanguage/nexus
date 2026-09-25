import express, { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.resolve(__dirname, 'data');

// Helpers for reading/writing data files
function readDataFile<T>(filename: string, fallback: T): T {
  try {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      return fallback;
    }
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    return fallback;
  }
}

function writeDataFile<T>(filename: string, data: T): boolean {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filename}:`, err);
    return false;
  }
}

// === STUDENT FLOW STORAGE ===
// Task → Work Session → Work Events → Submission → Verification → Evidence → TWIN.
// Unlike readDataFile, these helpers never fall back to an empty list on a broken file:
// that would let the next write wipe the stored flow. They raise HttpError instead.

// No auth in the demo: every Student Flow request acts as this student.
const DEMO_STUDENT = { id: 'student-demo', name: 'Alex Chen' };

const SESSIONS_FILE = 'work-sessions.json';
const EVENTS_FILE = 'workEvents.json'; // shared with /api/work-events; session events carry workSessionId
const SUBMISSIONS_FILE = 'submissions.json';
const VERIFICATIONS_FILE = 'verifications.json';
const EVIDENCE_FILE = 'evidence.json';

// Types from the Student Flow spec plus the ones already in src/types.ts (WorkEventType).
const EVENT_TYPES = [
  'TASK_STARTED', 'TASK_SUBMITTED', 'HUMAN_PROMPT', 'AI_RESPONSE', 'HUMAN_EDIT', 'CODE_CHANGE',
  'HUMAN_KEYSTROKE', 'HUMAN_CANVAS_DRAW', 'HUMAN_VERIFY'
];
const EVENT_ACTORS = ['HUMAN', 'AI', 'SYSTEM'];
const REQUIRED_VERIFICATION_ANSWERS = 3;

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function loadList(filename: string): any[] {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    if (!raw.trim()) return [];
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) throw new Error('not a JSON array');
    return data;
  } catch (err) {
    console.error(`Error reading ${filename}:`, err);
    throw new HttpError(500, `Could not read data/${filename}`);
  }
}

function saveList(filename: string, list: any[]): void {
  if (!writeDataFile(filename, list)) {
    throw new HttpError(500, `Could not write data/${filename}`);
  }
}

function ensureDataFiles(): void {
  for (const file of [SESSIONS_FILE, SUBMISSIONS_FILE, VERIFICATIONS_FILE, EVIDENCE_FILE]) {
    if (!fs.existsSync(path.join(DATA_DIR, file))) writeDataFile(file, []);
  }
}

const newId = (prefix: string) => `${prefix}-${randomUUID()}`;
const nowIso = () => new Date().toISOString();

function requireText(body: any, field: string): string {
  const value = body?.[field];
  if (typeof value !== 'string' || !value.trim()) {
    throw new HttpError(400, `Field "${field}" is required`);
  }
  return value;
}

function findById(list: any[], id: string, notFound: string): any {
  const item = list.find((x) => x.id === id);
  if (!item) throw new HttpError(404, notFound);
  return item;
}

// Wraps a Student Flow handler: HttpError → { error } with its status, anything else → 500.
function handle(fn: (req: Request, res: Response) => void) {
  return (req: Request, res: Response) => {
    try {
      fn(req, res);
    } catch (err) {
      if (err instanceof HttpError) {
        res.status(err.status).json({ error: err.message });
      } else {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  };
}

function appendSessionEvent(session: any, fields: { type: string; actor: string; summary: string; payload?: string; diffPercent?: number }) {
  const events = loadList(EVENTS_FILE);
  const event: any = {
    id: newId('event'),
    workSessionId: session.id,
    type: fields.type,
    actor: fields.actor,
    summary: fields.summary,
    payload: fields.payload ?? '',
    timestamp: nowIso(),
    // Seconds since the session started: raw timing evidence, not interpreted here.
    timeOffsetSec: Math.max(0, Math.round((Date.now() - Date.parse(session.startedAt)) / 1000))
  };
  if (typeof fields.diffPercent === 'number') event.diffPercent = fields.diffPercent;
  events.push(event);
  saveList(EVENTS_FILE, events);
  return event;
}

function requireActiveSession(session: any): void {
  if (session.status !== 'ACTIVE') {
    throw new HttpError(409, `Work Session is ${session.status}, not ACTIVE`);
  }
}

// Skills come from the task itself (skillsTested), falling back to its internship's requiredSkills.
function skillsForTask(taskId: string): string[] {
  const task = readDataFile<any[]>('tasks.json', []).find((t) => t.id === taskId);
  if (Array.isArray(task?.skillsTested) && task.skillsTested.length) return task.skillsTested;
  const internship = readDataFile<any[]>('internships.json', []).find((i) => i.id === task?.internshipId);
  return Array.isArray(internship?.requiredSkills) ? internship.requiredSkills : [];
}

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());

  // === REST API ENDPOINTS FOR DATA PERSISTENCE ===

  // Health check
  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'Nexus Full-Stack Engine',
      storage: 'JSON File System (/data)',
      time: new Date().toISOString()
    });
  });

  // Internships API
  app.get('/api/internships', (_req: Request, res: Response) => {
    const internships = readDataFile('internships.json', []);
    res.json(internships);
  });

  app.post('/api/internships', (req: Request, res: Response) => {
    const list = readDataFile<any[]>('internships.json', []);
    const newInternship = {
      ...req.body,
      id: req.body.id || `intern-${Date.now()}`
    };
    list.unshift(newInternship);
    writeDataFile('internships.json', list);
    res.status(201).json(newInternship);
  });

  // Tasks API
  app.get('/api/tasks', (_req: Request, res: Response) => {
    const tasks = readDataFile('tasks.json', []);
    res.json(tasks);
  });

  app.post('/api/tasks', (req: Request, res: Response) => {
    const list = readDataFile<any[]>('tasks.json', []);
    const newTask = {
      ...req.body,
      id: req.body.id || `task-${Date.now()}`
    };
    list.push(newTask);
    writeDataFile('tasks.json', list);
    res.status(201).json(newTask);
  });

  // WorkEvents Telemetry API
  app.get('/api/work-events', (_req: Request, res: Response) => {
    const events = readDataFile('workEvents.json', []);
    res.json(events);
  });

  app.post('/api/work-events', (req: Request, res: Response) => {
    const events = readDataFile<any[]>('workEvents.json', []);
    const newEvent = {
      ...req.body,
      id: req.body.id || `we-${Date.now()}`,
      timestamp: req.body.timestamp || new Date().toLocaleTimeString('en-US', { hour12: false })
    };
    events.push(newEvent);
    writeDataFile('workEvents.json', events);
    res.status(201).json(newEvent);
  });

  // Passports API
  app.get('/api/passports', (_req: Request, res: Response) => {
    const passports = readDataFile('passports.json', []);
    res.json(passports);
  });

  app.post('/api/passports', (req: Request, res: Response) => {
    const passports = readDataFile<any[]>('passports.json', []);
    const newPassport = {
      ...req.body,
      passportId: req.body.passportId || `NEX-${Date.now()}`
    };
    passports.push(newPassport);
    writeDataFile('passports.json', passports);
    res.status(201).json(newPassport);
  });

  // === STUDENT FLOW API ===

  ensureDataFiles();

  // Start a task: creates an ACTIVE Work Session (or returns the student's open one for this task).
  app.post('/api/tasks/:taskId/start', handle((req, res) => {
    const task = findById(readDataFile<any[]>('tasks.json', []), req.params.taskId, 'Task not found');
    const sessions = loadList(SESSIONS_FILE);
    const open = sessions.find(
      (s) => s.taskId === task.id && s.studentId === DEMO_STUDENT.id && s.status === 'ACTIVE'
    );
    if (open) {
      res.status(200).json(open);
      return;
    }
    const session = {
      id: newId('ws'),
      taskId: task.id,
      internshipId: task.internshipId,
      studentId: DEMO_STUDENT.id,
      status: 'ACTIVE',
      startedAt: nowIso()
    };
    sessions.push(session);
    saveList(SESSIONS_FILE, sessions);
    appendSessionEvent(session, { type: 'TASK_STARTED', actor: 'SYSTEM', summary: `Task started: ${task.title}` });
    res.status(201).json(session);
  }));

  // Record a Human / AI / system action inside an ACTIVE Work Session.
  app.post('/api/work-sessions/:sessionId/events', handle((req, res) => {
    const session = findById(loadList(SESSIONS_FILE), req.params.sessionId, 'Work Session not found');
    requireActiveSession(session);
    const { type, actor, payload, diffPercent } = req.body ?? {};
    if (!EVENT_TYPES.includes(type)) {
      throw new HttpError(400, `Field "type" must be one of: ${EVENT_TYPES.join(', ')}`);
    }
    if (!EVENT_ACTORS.includes(actor)) {
      throw new HttpError(400, `Field "actor" must be one of: ${EVENT_ACTORS.join(', ')}`);
    }
    if (payload !== undefined && typeof payload !== 'string') {
      throw new HttpError(400, 'Field "payload" must be a string');
    }
    const summary = requireText(req.body, 'summary');
    res.status(201).json(appendSessionEvent(session, { type, actor, summary, payload, diffPercent }));
  }));

  app.get('/api/work-sessions/:sessionId/events', handle((req, res) => {
    const session = findById(loadList(SESSIONS_FILE), req.params.sessionId, 'Work Session not found');
    res.json(loadList(EVENTS_FILE).filter((e) => e.workSessionId === session.id));
  }));

  // Submit the final solution: ACTIVE → SUBMITTED.
  app.post('/api/work-sessions/:sessionId/submit', handle((req, res) => {
    const sessions = loadList(SESSIONS_FILE);
    const session = findById(sessions, req.params.sessionId, 'Work Session not found');
    requireActiveSession(session);
    const solution = requireText(req.body, 'solution');
    const notes = req.body?.notes;
    if (notes !== undefined && typeof notes !== 'string') {
      throw new HttpError(400, 'Field "notes" must be a string');
    }

    const submission = {
      id: newId('sub'),
      workSessionId: session.id,
      taskId: session.taskId,
      studentId: session.studentId,
      status: 'SUBMITTED',
      solution,
      notes: notes ?? '',
      submittedAt: nowIso()
    };
    const submissions = loadList(SUBMISSIONS_FILE);
    submissions.push(submission);
    saveList(SUBMISSIONS_FILE, submissions);

    session.status = 'SUBMITTED';
    session.submittedAt = submission.submittedAt;
    saveList(SESSIONS_FILE, sessions);
    appendSessionEvent(session, { type: 'TASK_SUBMITTED', actor: 'SYSTEM', summary: 'Final solution submitted' });
    res.status(201).json(submission);
  }));

  // Live verification (demo rule: three non-empty answers → VERIFIED; answers are not graded).
  // A VERIFIED result immediately creates the Evidence record.
  app.post('/api/submissions/:submissionId/verification', handle((req, res) => {
    const submission = findById(loadList(SUBMISSIONS_FILE), req.params.submissionId, 'Submission not found');
    const verifications = loadList(VERIFICATIONS_FILE);
    if (verifications.some((v) => v.submissionId === submission.id)) {
      throw new HttpError(409, 'Submission is already verified');
    }

    const { answers, focusChanges = 0 } = req.body ?? {};
    const valid =
      Array.isArray(answers) &&
      answers.length >= REQUIRED_VERIFICATION_ANSWERS &&
      answers.every(
        (a: any) => typeof a?.question === 'string' && a.question.trim() &&
          typeof a?.answer === 'string' && a.answer.trim()
      );
    if (!valid) {
      throw new HttpError(400, `Field "answers" must contain ${REQUIRED_VERIFICATION_ANSWERS} items with non-empty "question" and "answer"`);
    }
    if (!Number.isInteger(focusChanges) || focusChanges < 0) {
      throw new HttpError(400, 'Field "focusChanges" must be a non-negative integer');
    }

    const verification = {
      id: newId('verification'),
      submissionId: submission.id,
      workSessionId: submission.workSessionId,
      status: 'VERIFIED',
      answers: answers.map((a: any) => ({ question: a.question, answer: a.answer })),
      focusChanges,
      verifiedAt: nowIso()
    };
    const evidence = {
      id: newId('evidence'),
      studentId: submission.studentId,
      taskId: submission.taskId,
      workSessionId: submission.workSessionId,
      submissionId: submission.id,
      verificationId: verification.id,
      status: 'VERIFIED',
      skills: skillsForTask(submission.taskId),
      createdAt: verification.verifiedAt
    };
    verifications.push(verification);
    saveList(VERIFICATIONS_FILE, verifications);
    const evidenceList = loadList(EVIDENCE_FILE);
    evidenceList.push(evidence);
    saveList(EVIDENCE_FILE, evidenceList);
    res.status(201).json({ ...verification, evidenceId: evidence.id });
  }));

  // TWIN Passport, built only from Evidence: group verified evidence by skill (no scores).
  app.get('/api/students/me/twin', handle((_req, res) => {
    const evidence = loadList(EVIDENCE_FILE).filter(
      (e) => e.studentId === DEMO_STUDENT.id && e.status === 'VERIFIED'
    );
    const tasks = readDataFile<any[]>('tasks.json', []);
    const bySkill = new Map<string, any[]>();
    for (const e of evidence) {
      const taskTitle = tasks.find((t) => t.id === e.taskId)?.title ?? e.taskId;
      for (const skill of e.skills ?? []) {
        if (!bySkill.has(skill)) bySkill.set(skill, []);
        bySkill.get(skill)!.push({
          evidenceId: e.id,
          taskId: e.taskId,
          taskTitle,
          workSessionId: e.workSessionId,
          submissionId: e.submissionId,
          verificationId: e.verificationId,
          verificationStatus: e.status,
          createdAt: e.createdAt
        });
      }
    }
    res.json({
      studentId: DEMO_STUDENT.id,
      name: DEMO_STUDENT.name,
      evidenceCount: evidence.length,
      skills: [...bySkill].map(([name, items]) => ({ name, status: 'VERIFIED', evidence: items }))
    });
  }));

  // Download ZIP endpoint
  app.get('/api/download-zip', (_req: Request, res: Response) => {
    const zipPath = path.resolve(__dirname, 'public', 'nexus-platform-source.zip');
    if (fs.existsSync(zipPath)) {
      res.download(zipPath, 'nexus-fullstack-platform.zip');
    } else {
      res.status(404).json({ error: 'Zip archive not ready yet' });
    }
  });

  // Serve static public assets
  app.use(express.static(path.resolve(__dirname, 'public')));

  if (!isProduction) {
    // Development mode: attach Vite middleware
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // Production mode: serve built client assets
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Nexus Full-Stack server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
