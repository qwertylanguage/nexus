import React from 'react';
import { RoadmapStageId, UserRole } from '../types';
import { ROADMAP_STEPS } from '../mockData';
import { CheckCircle2, ChevronRight } from 'lucide-react';

interface RoadmapProgressBarProps {
  currentStage: RoadmapStageId;
  setCurrentStage: (stage: RoadmapStageId) => void;
  userRole: UserRole;
  lang: 'en' | 'ru';
}

export const RoadmapProgressBar: React.FC<RoadmapProgressBarProps> = ({
  currentStage,
  setCurrentStage,
  userRole,
  lang
}) => {
  const currentIndex = ROADMAP_STEPS.findIndex((s) => s.id === currentStage);

  return (
    <div className="w-full bg-[#090b10] border-b border-white/[0.06] px-4 py-2 overflow-x-auto scrollbar-thin select-none">
      <div className="max-w-7xl mx-auto flex items-center gap-1.5 min-w-[960px]">
        {ROADMAP_STEPS.map((step, idx) => {
          const isActive = step.id === currentStage;
          const isPassed = idx < currentIndex;

          let roleNote = '';
          if (step.id === 'internships') {
            roleNote = userRole === 'STUDENT' ? 'View' : 'Create';
          } else if (step.id === 'tasks') {
            roleNote = userRole === 'STUDENT' ? 'Apply' : 'Tasks+Skills';
          }

          return (
            <React.Fragment key={step.id}>
              <button
                onClick={() => setCurrentStage(step.id)}
                className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left transition-all border cursor-pointer ${
                  isActive
                    ? 'bg-white/[0.08] border-cyan-500/70 shadow-sm text-white ring-1 ring-cyan-500/30'
                    : isPassed
                    ? 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.14] text-slate-300'
                    : 'bg-transparent border-transparent hover:bg-white/[0.03] text-slate-500 hover:text-slate-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-cyan-500 text-slate-950 font-black'
                      : isPassed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-white/[0.06] text-slate-500'
                  }`}
                >
                  {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.number}
                </div>

                <div className="flex flex-col whitespace-nowrap">
                  <span
                    className={`text-xs font-medium tracking-tight ${
                      isActive ? 'text-cyan-300 font-bold' : 'group-hover:text-slate-200'
                    }`}
                  >
                    {lang === 'ru' ? step.titleRu : step.title}
                  </span>
                  {roleNote && (
                    <span className="text-[10px] text-slate-500 font-mono">
                      {roleNote}
                    </span>
                  )}
                </div>
              </button>

              {idx < ROADMAP_STEPS.length - 1 && (
                <ChevronRight className="w-3.5 h-3.5 text-slate-700 shrink-0" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
