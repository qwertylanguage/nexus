import React from 'react';
import { UserRole, RoadmapStageId } from '../types';
import { ROADMAP_STEPS } from '../mockData';
import { NexusLogo } from './NexusLogo';
import { 
  Layers, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles,
  Building2,
  GraduationCap,
  Globe,
  FolderArchive
} from 'lucide-react';

interface NavbarProps {
  currentStage: RoadmapStageId;
  setCurrentStage: (stage: RoadmapStageId) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  canvasMode: boolean;
  setCanvasMode: (val: boolean) => void;
  lang: 'en' | 'ru';
  setLang: (lang: 'en' | 'ru') => void;
  onOpenZipModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStage,
  setCurrentStage,
  userRole,
  setUserRole,
  canvasMode,
  setCanvasMode,
  lang,
  setLang,
  onOpenZipModal
}) => {
  const currentStepIndex = ROADMAP_STEPS.findIndex((s) => s.id === currentStage);
  const currentStep = ROADMAP_STEPS[currentStepIndex] || ROADMAP_STEPS[0];

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStage(ROADMAP_STEPS[currentStepIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < ROADMAP_STEPS.length - 1) {
      setCurrentStage(ROADMAP_STEPS[currentStepIndex + 1].id);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#07080b]/90 backdrop-blur-xl text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Nexus Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCurrentStage('login')}
            className="flex items-center gap-2 text-left group cursor-pointer"
            title="Nexus Platform - Home"
          >
            <NexusLogo size="md" theme="dark" animated />
          </button>

          <span className="hidden sm:inline-block text-xs font-mono text-slate-500 pl-2 border-l border-white/[0.1]">
            {lang === 'ru' ? currentStep.titleRu : currentStep.title}
          </span>
        </div>

        {/* Zone 2: Navigation controls */}
        <nav className="flex items-center gap-2 sm:gap-3 text-xs">
          {/* Canvas Mode Toggle */}
          <button
            onClick={() => setCanvasMode(!canvasMode)}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all font-medium border cursor-pointer ${
              canvasMode
                ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/50 shadow-sm'
                : 'bg-white/[0.03] text-slate-300 border-white/[0.08] hover:border-white/[0.16] hover:bg-white/[0.06]'
            }`}
            title={lang === 'ru' ? 'Интерактивная канва родмапа' : 'Visual interactive roadmap canvas'}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">
              {lang === 'ru' ? 'Канва Родмапа' : 'Roadmap Canvas'}
            </span>
          </button>

          {/* Prev / Next buttons */}
          <div className="flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl p-0.5">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Previous stage"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono text-slate-300 text-[11px] tabular-nums font-semibold">
              {currentStep.number} / {ROADMAP_STEPS.length}
            </span>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === ROADMAP_STEPS.length - 1}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Next stage"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Language Switch */}
          <button
            onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}
            className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 hover:text-white flex items-center gap-1 text-[11px] font-mono transition-colors cursor-pointer font-semibold"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang.toUpperCase()}</span>
          </button>
        </nav>

        {/* Zone 3: Role Selector & Action */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center bg-white/[0.03] border border-white/[0.08] p-0.5 rounded-xl">
            <button
                onClick={() => {
                  setUserRole('STUDENT');
                  setCanvasMode(false);
                  setCurrentStage('internships');
                }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                userRole === 'STUDENT'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Student</span>
            </button>
            <button
                onClick={() => {
                  setUserRole('COMPANY');
                  setCanvasMode(false);
                  setCurrentStage('company-dashboard');
                }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                userRole === 'COMPANY'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-purple-400" />
              <span className="hidden sm:inline">Company</span>
            </button>
          </div>

          <button
            onClick={() => setCurrentStage('twin-passport')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-white/[0.04] border border-white/[0.1] text-slate-200 hover:bg-white/[0.08] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Passport</span>
          </button>

          {onOpenZipModal && (
            <button
              onClick={onOpenZipModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 transition-colors shadow-sm cursor-pointer"
              title={lang === 'ru' ? 'Скачать исходный код (.zip) и API бэкенда' : 'Download Source Code (.zip) & Full-Stack files'}
            >
              <FolderArchive className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'ru' ? 'ZIP Код' : 'ZIP Code'}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
