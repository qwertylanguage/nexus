export type UserRole = 'STUDENT' | 'COMPANY';

export type RoadmapStageId =
    | 'login'
    | 'role-selection'
    | 'internships'
    | 'tasks'
    | 'start-task'
    | 'work-session'
    | 'submit-solution'
    | 'explanation'
    | 'evidence'
    | 'twin-passport'
    | 'company-dashboard'
    | 'company-create-internship'
    | 'company-create-task'
    | 'company-candidates'
    | 'company-evidence';;

export interface RoadmapStep {
  id: RoadmapStageId;
  number: number;
  title: string;
  titleRu: string;
  shortDesc: string;
  shortDescRu: string;
  category: 'onboarding' | 'matching' | 'execution' | 'defense' | 'credential';
}

export interface Internship {
  id: string;
  companyName: string;
  companyLogoText: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Part-time' | 'Remote';
  stipend: string;
  duration: string;
  spots: number;
  applicantsCount: number;
  tags: string[];
  description: string;
  tasksCount: number;
  requiredSkills: string[];
  matchScore?: number;
}

export interface InternshipTask {
  id: string;
  internshipId: string;
  title: string;
  estimatedHours: string;
  difficulty: 'Entry' | 'Intermediate' | 'Advanced' | 'Senior';
  overview: string;
  deliverables: string[];
  skillsTested: string[];
  rubric: {
    humanReasoningWeight: number; // e.g. 40%
    aiOrchestrationWeight: number; // e.g. 30%
    codeQualityWeight: number; // e.g. 30%
  };
}

export type WorkEventType =
  | 'HUMAN_KEYSTROKE'
  | 'HUMAN_CANVAS_DRAW'
  | 'HUMAN_PROMPT'
  | 'AI_RESPONSE'
  | 'HUMAN_EDIT'
  | 'HUMAN_VERIFY';

export interface WorkEvent {
  id: string;
  timestamp: string;
  timeOffsetSec: number;
  type: WorkEventType;
  actor: 'HUMAN' | 'AI';
  summary: string;
  payload: string;
  diffPercent?: number;
}

export interface CanvasShape {
  id: string;
  type: 'box' | 'cylinder' | 'cloud' | 'text' | 'arrow';
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  color: string;
}

export interface DefenseMessage {
  id: string;
  sender: 'ai' | 'student';
  text: string;
  timestamp: string;
  isFollowUp?: boolean;
  status?: 'delivered' | 'analyzing' | 'approved';
}

export interface TwinPassportData {
  passportId: string;
  studentName: string;
  studentRole: string;
  studentAvatar: string;
  internshipTitle: string;
  companyName: string;
  issueDate: string;
  status: 'VERIFIED_GOLD' | 'VERIFIED_SILVER';
  merkleRootHash: string;
  humanAiRatio: {
    human: number; // 58%
    ai: number; // 42%
  };
  defenseScore: number; // 96
  skills: {
    name: string;
    level: string;
    score: number; // 0-100
  }[];
  workEventsCount: number;
  totalTimeSpent: string;
  integrityIndex: number; // 99.4%
}
