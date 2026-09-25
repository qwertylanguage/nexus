import { 
  Internship, 
  InternshipTask, 
  WorkEvent, 
  TwinPassportData 
} from '../types';
import { 
  INITIAL_INTERNSHIPS, 
  INITIAL_TASKS, 
  INITIAL_WORK_EVENTS, 
  INITIAL_TWIN_PASSPORT 
} from '../mockData';

// Service to communicate with Express Backend and JSON file persistence (/data/*.json)
export const ApiService = {
  // Fetch Internships
  async getInternships(): Promise<Internship[]> {
    try {
      const res = await fetch('/api/internships');
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : INITIAL_INTERNSHIPS;
    } catch {
      return INITIAL_INTERNSHIPS;
    }
  },

  // Save new Internship
  async saveInternship(internship: Partial<Internship>): Promise<Internship> {
    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(internship)
      });
      if (!res.ok) throw new Error('Failed to save internship');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, returning local record', err);
      return internship as Internship;
    }
  },

  // Fetch Tasks
  async getTasks(): Promise<InternshipTask[]> {
    try {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  },

  // Save new Task
  async saveTask(task: Partial<InternshipTask>): Promise<InternshipTask> {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
      if (!res.ok) throw new Error('Failed to save task');
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, returning local record', err);
      return task as InternshipTask;
    }
  },

  // Fetch Work Events
  async getWorkEvents(): Promise<WorkEvent[]> {
    try {
      const res = await fetch('/api/work-events');
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : INITIAL_WORK_EVENTS;
    } catch {
      return INITIAL_WORK_EVENTS;
    }
  },

  // Save Work Event to file
  async saveWorkEvent(event: Partial<WorkEvent>): Promise<WorkEvent> {
    try {
      const res = await fetch('/api/work-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
      if (!res.ok) throw new Error('Failed to record work event');
      return await res.json();
    } catch (err) {
      return event as WorkEvent;
    }
  },

  // Fetch Passport
  async getPassports(): Promise<TwinPassportData[]> {
    try {
      const res = await fetch('/api/passports');
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : [INITIAL_TWIN_PASSPORT];
    } catch {
      return [INITIAL_TWIN_PASSPORT];
    }
  },

  // Save Passport to file
  async savePassport(passport: TwinPassportData): Promise<TwinPassportData> {
    try {
      const res = await fetch('/api/passports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passport)
      });
      if (!res.ok) throw new Error('Failed to save passport');
      return await res.json();
    } catch (err) {
      return passport;
    }
  },

  // Trigger download of complete source code ZIP
  downloadSourceZip() {
    window.location.href = '/nexus-platform-source.zip';
  }
};
