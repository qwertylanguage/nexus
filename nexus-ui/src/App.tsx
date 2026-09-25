/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  RoadmapStageId, 
  UserRole, 
  Internship, 
  InternshipTask, 
  WorkEvent 
} from './types';
import { 
  INITIAL_INTERNSHIPS, 
  INITIAL_TASKS, 
  INITIAL_WORK_EVENTS,
  INITIAL_TWIN_PASSPORT
} from './mockData';
import { Navbar } from './components/Navbar';
import { RoadmapProgressBar } from './components/RoadmapProgressBar';
import { InteractiveRoadmapCanvas } from './components/InteractiveRoadmapCanvas';
import { SourceCodeZipModal } from './components/SourceCodeZipModal';
import { ApiService } from './services/api';

// 10 Individual Roadmap Stage Pages
import { Stage1Login } from './pages/Stage1Login';
import { Stage2RoleSelection } from './pages/Stage2RoleSelection';
import { Stage3Internships } from './pages/Stage3Internships';
import { Stage4Tasks } from './pages/Stage4Tasks';
import { Stage5StartTask } from './pages/Stage5StartTask';
import { Stage6WorkSession } from './pages/Stage6WorkSession';
import { Stage7SubmitSolution } from './pages/Stage7SubmitSolution';
import { Stage8Explanation } from './pages/Stage8Explanation';
import { Stage9Evidence } from './pages/Stage9Evidence';
import { Stage10TwinPassport } from './pages/Stage10TwinPassport';

import { CompanyDashboard } from './pages/company/CompanyDashboard';
import { Candidates } from './pages/company/Candidates';
import { CandidateEvidence } from './pages/company/CandidateEvidence';

import { CreateInternship } from './pages/company/CreateInternship';
import { CreateTask } from './pages/company/CreateTask';

export default function App() {
  const [currentStage, setCurrentStage] = useState<RoadmapStageId>('login');
  useEffect(() => {
    console.log('APP MOUNTED');

    return () => {
      console.log('APP UNMOUNTED');
    };
  }, []);
  const [userRole, setUserRole] = useState<UserRole>('STUDENT');
  const [canvasMode, setCanvasMode] = useState<boolean>(false);
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [isZipModalOpen, setIsZipModalOpen] = useState<boolean>(false);
  const [createdInternshipTitle, setCreatedInternshipTitle] = useState('');

  // Shared state across stages
  const [internships, setInternships] = useState<Internship[]>(INITIAL_INTERNSHIPS);
  const [selectedInternship, setSelectedInternship] = useState<Internship>(INITIAL_INTERNSHIPS[0]);

  const [tasks, setTasks] = useState<InternshipTask[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<InternshipTask>(INITIAL_TASKS[0]);

  const [workEvents, setWorkEvents] = useState<WorkEvent[]>(INITIAL_WORK_EVENTS);

  // Load persisted data from backend /api endpoints if available
  useEffect(() => {
    ApiService.getInternships().then((data) => {
      if (data && data.length > 0) {
        setInternships(data);
        setSelectedInternship(data[0]);
      }
    });
    ApiService.getTasks().then((data) => {
      if (data && data.length > 0) {
        setTasks(data);
        setSelectedTask(data[0]);
      }
    });
    ApiService.getWorkEvents().then((data) => {
      if (data && data.length > 0) {
        setWorkEvents(data);
      }
    });
  }, []);

  // Handlers for stage progression
  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    setCurrentStage('role-selection');
  };

  const handleSelectRole = (role: UserRole) => {
    setUserRole(role);

    if (role === 'COMPANY') {
      setCurrentStage('company-dashboard');
    } else {
      setCurrentStage('internships');
    }
  };

  const handleAddInternship = (newIntern: Internship) => {
    setInternships((prev) => [newIntern, ...prev]);
    ApiService.saveInternship(newIntern);
  };

  const handleAddTask = (newTask: InternshipTask) => {
    setTasks((prev) => [newTask, ...prev]);
    ApiService.saveTask(newTask);
  };

  const handleAddWorkEvent = (event: WorkEvent) => {
    setWorkEvents((prev) => [...prev, event]);
    ApiService.saveWorkEvent(event);
  };

  return (
    <div className="min-h-screen bg-[#07080b] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Bar */}
      <Navbar
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        userRole={userRole}
        setUserRole={setUserRole}
        canvasMode={canvasMode}
        setCanvasMode={setCanvasMode}
        lang={lang}
        setLang={setLang}
        onOpenZipModal={() => setIsZipModalOpen(true)}
      />

      {/* Full-Stack Source Code & ZIP Modal */}
      <SourceCodeZipModal
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
        lang={lang}
      />

      {/* 10-Step Interactive Roadmap Stepper Bar */}
      {!canvasMode && !currentStage.startsWith('company-') && (
        <RoadmapProgressBar
          currentStage={currentStage}
          setCurrentStage={setCurrentStage}
          userRole={userRole}
          lang={lang}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {canvasMode ? (
          <InteractiveRoadmapCanvas
            currentStage={currentStage}
            setCurrentStage={setCurrentStage}
            userRole={userRole}
            onCloseCanvas={() => setCanvasMode(false)}
            lang={lang}
          />
        ) : (
          <div className="flex-1">
            {currentStage === 'login' && (
              <Stage1Login
                onLoginSuccess={handleLoginSuccess}
                lang={lang}
              />
            )}

            {currentStage === 'role-selection' && (
              <Stage2RoleSelection
                currentRole={userRole}
                onSelectRole={handleSelectRole}
                lang={lang}
              />
            )}

            {currentStage === 'internships' && (
              <Stage3Internships
                internships={internships}
                selectedInternship={selectedInternship}
                onSelectInternship={setSelectedInternship}
                onAddInternship={handleAddInternship}
                userRole={userRole}
                onProceedToTasks={() => setCurrentStage('tasks')}
                lang={lang}
              />
            )}

            {currentStage === 'tasks' && (
              <Stage4Tasks
                internship={selectedInternship}
                tasks={tasks}
                selectedTask={selectedTask}
                onSelectTask={setSelectedTask}
                onAddTask={handleAddTask}
                userRole={userRole}
                onProceedToStart={() => setCurrentStage('start-task')}
                lang={lang}
              />
            )}

            {currentStage === 'start-task' && (
              <Stage5StartTask
                internship={selectedInternship}
                task={selectedTask}
                onLaunchWorkSession={() => setCurrentStage('work-session')}
                lang={lang}
              />
            )}

            {currentStage === 'work-session' && (
              <Stage6WorkSession
                task={selectedTask}
                workEvents={workEvents}
                onAddWorkEvent={handleAddWorkEvent}
                onProceedToSubmit={() => setCurrentStage('submit-solution')}
                lang={lang}
              />
            )}

            {currentStage === 'submit-solution' && (
              <Stage7SubmitSolution
                task={selectedTask}
                workEvents={workEvents}
                onSubmitSuccess={() => setCurrentStage('explanation')}
                lang={lang}
              />
            )}

            {currentStage === 'explanation' && (
              <Stage8Explanation
                task={selectedTask}
                onDefenseComplete={() => setCurrentStage('evidence')}
                lang={lang}
              />
            )}

            {currentStage === 'evidence' && (
              <Stage9Evidence
                task={selectedTask}
                workEvents={workEvents}
                onMintPassport={() => setCurrentStage('twin-passport')}
                lang={lang}
              />
            )}

            {currentStage === 'twin-passport' && (
              <Stage10TwinPassport
                passportData={INITIAL_TWIN_PASSPORT}
                onRestartRoadmap={() => setCurrentStage('login')}
                onOpenCanvasView={() => setCanvasMode(true)}
                lang={lang}
              />
            )}

            {currentStage === 'company-dashboard' && (
                <CompanyDashboard
                    onCreateInternship={() => setCurrentStage('company-create-internship')}
                    onViewCandidates={() => setCurrentStage('company-candidates')}
                    lang={lang}
                />
            )}

            {currentStage === 'company-create-internship' && (
                <CreateInternship
                    onCancel={() => setCurrentStage('company-dashboard')}
                    onCreated={(internship) => {
                      setCreatedInternshipTitle(internship.title);
                      setCurrentStage('company-create-task');
                    }}
                    lang={lang}
                />
            )}

            {currentStage === 'company-create-task' && (
                <CreateTask
                    lang={lang}
                    onCancel={() => setCurrentStage('company-create-internship')}
                    onCreated={(task) => {
                      console.log('Created task:', task);
                      setCurrentStage('company-dashboard');
                    }}
                />
            )}

            {currentStage === 'company-candidates' && (
                <Candidates
                    onBack={() => setCurrentStage('company-dashboard')}
                    onViewCandidate={() => setCurrentStage('company-evidence')}
                    lang={lang}
                />
            )}

            {currentStage === 'company-evidence' && (
                <CandidateEvidence
                    onBack={() => setCurrentStage('company-candidates')}
                    lang={lang}
                />
            )}

          </div>
        )}
      </main>

      {/* Quiet Minimal Footer per Skill Rules */}
      <footer className="border-t border-white/[0.06] bg-[#07080b] px-6 py-4 text-xs font-mono text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-white font-black tracking-tight">nexus</span>
          <span>·</span>
          <span>{lang === 'ru' ? 'Верифицированный протокол навыков человека и ИИ' : 'Verified Human + AI Proof-of-Skill Platform'}</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <button
            onClick={() => setCanvasMode(true)}
            className="hover:text-cyan-400 transition-colors cursor-pointer"
          >
            {lang === 'ru' ? 'Канва Родмапа' : 'Roadmap Canvas'}
          </button>
          <span>·</span>
          <button
            onClick={() => setCurrentStage('twin-passport')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            Nexus Passport
          </button>
          <span>·</span>
          <button
            onClick={() => setIsZipModalOpen(true)}
            className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>{lang === 'ru' ? 'Скачать код (.zip)' : 'Source Code (.zip)'}</span>
          </button>
          <span>·</span>
          <span>© 2026 Nexus Protocol</span>
        </div>
      </footer>
    </div>
  );
}
