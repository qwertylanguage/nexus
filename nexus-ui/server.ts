import express, { Request, Response } from 'express';
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
