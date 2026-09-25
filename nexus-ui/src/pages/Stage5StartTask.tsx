import React, { useState } from 'react';
import { Internship, InternshipTask } from '../types';
import { 
  Play, 
  Clock, 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Layers, 
  ArrowRight
} from 'lucide-react';

interface Stage5StartTaskProps {
  internship: Internship;
  task: InternshipTask;
  onLaunchWorkSession: () => void;
  lang: 'en' | 'ru';
}

export const Stage5StartTask: React.FC<Stage5StartTaskProps> = ({
  internship,
  task,
  onLaunchWorkSession,
  lang
}) => {
  const [isPrepping, setIsPrepping] = useState(false);
  const [prepProgress, setPrepProgress] = useState(0);

  const handleLaunch = () => {
    setIsPrepping(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 25;
      setPrepProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onLaunchWorkSession();
        }, 200);
      }
    }, 150);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-left space-y-6 select-none">
      {/* Step Lead */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
          {lang === 'ru' ? 'Шаг 5 · Запуск задачи' : 'Step 5 · Task Launch'}
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight">
          {lang === 'ru' ? 'Запуск квалификационной задачи' : 'Start Task'}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          {lang === 'ru'
            ? 'Инициализация изолированной среды, канвы и регистратора WorkEvents.'
            : 'Initialize the isolated development sandbox and telemetry driver.'}
        </p>
      </div>

      {/* Main Readiness Card */}
      <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-cyan-400 font-semibold mb-1">
              {internship.companyName}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {task.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-mono font-bold">
              {task.difficulty}
            </span>
            <span className="px-3 py-1 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {task.estimatedHours}
            </span>
          </div>
        </div>

        {/* Readiness Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06]">
            <div className="flex items-center gap-2 text-cyan-400 mb-1.5">
              <Layers className="w-4 h-4" />
              <span className="text-xs font-bold font-mono text-white">
                {lang === 'ru' ? 'Канва' : 'Canvas'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'ru' ? 'Вайтборд узлов кластера' : 'Interactive node topology'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06]">
            <div className="flex items-center gap-2 text-purple-400 mb-1.5">
              <Cpu className="w-4 h-4" />
              <span className="text-xs font-bold font-mono text-white">
                {lang === 'ru' ? 'AI Копилот' : 'AI Copilot'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'ru' ? 'Контекстный помощник' : 'Telemetry-bound assistant'}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06]">
            <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold font-mono text-white">
                WorkEvents
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {lang === 'ru' ? 'Аудит действий' : 'Tamper-proof event log'}
            </p>
          </div>
        </div>

        {/* Diagnostic Terminal View */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-300 space-y-1">
          <div className="flex items-center justify-between text-slate-500 pb-1.5 border-b border-white/[0.06]">
            <span className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              nexus-sandbox-init
            </span>
            <span className="text-emerald-400">READY</span>
          </div>
          <div className="text-slate-400">[0.001s] Environment: Go 1.22 Runtime</div>
          <div className="text-cyan-400">[0.042s] WorkEvents SHA-256 buffer armed</div>
          <div className="text-purple-400">[0.089s] AI Copilot channel linked</div>
        </div>

        {/* Launch Button or Progress */}
        <div className="pt-2">
          {isPrepping ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>{lang === 'ru' ? 'Развёртывание среды...' : 'Launching sandbox...'}</span>
                <span>{prepProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-150"
                  style={{ width: `${prepProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <button
              onClick={handleLaunch}
              className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:opacity-95 transition-opacity flex items-center justify-center gap-3 shadow-md cursor-pointer group"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>
                {lang === 'ru' 
                  ? 'Войти в рабочую сессию (Шаг 6: Work Session)' 
                  : 'Enter Live Work Session (Step 6)'}
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
