import React, { useState } from 'react';
import { InternshipTask, WorkEvent } from '../types';
import { 
  CheckCircle2,
  FileCode, 
  Layers, 
  Activity, 
  ArrowRight, 
  Lock
} from 'lucide-react';

interface Stage7SubmitSolutionProps {
  task: InternshipTask;
  workEvents: WorkEvent[];
  onSubmitSuccess: () => void;
  lang: 'en' | 'ru';
}

export const Stage7SubmitSolution: React.FC<Stage7SubmitSolutionProps> = ({
  task,
  workEvents,
  onSubmitSuccess,
  lang
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionCompleted, setSubmissionCompleted] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmissionCompleted(true);
      setTimeout(() => {
        onSubmitSuccess();
      }, 700);
    }, 900);
  };

  const humanEvents = workEvents.filter((e) => e.actor === 'HUMAN').length;
  const aiEvents = workEvents.filter((e) => e.actor === 'AI').length;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-left space-y-6 select-none">
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
          {lang === 'ru' ? 'Шаг 7 · Отправка решения' : 'Step 7 · Solution Submission'}
        </span>
        <h2 className="text-3xl font-black text-white tracking-tight">
          {lang === 'ru' ? 'Фиксация и отправка' : 'Submit Solution'}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm">
          {lang === 'ru'
              ? 'Фиксируем решение и WorkEvents перед короткой проверкой понимания.'
              : 'Package your solution and WorkEvents before a short understanding check.'}
        </p>
      </div>

      {/* Manifest Card */}
      <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-slate-500">Task Deliverable</div>
            <h3 className="text-lg font-bold text-white">{task.title}</h3>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>Ready</span>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <FileCode className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Go Invariant Patch</div>
              <div className="text-[10px] text-slate-500 font-mono">148 lines · Verified</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Topology Canvas</div>
              <div className="text-[10px] text-slate-500 font-mono">3 nodes + quorum</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">WorkEvents Trace</div>
              <div className="text-[10px] text-slate-500 font-mono">{humanEvents} human / {aiEvents} AI</div>
            </div>
          </div>
        </div>



        {/* Action Button */}
        <div className="pt-2">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || submissionCompleted}
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                <span>{lang === 'ru' ? 'Отправка решения...' : 'Submitting solution...'}</span>
              </>
            ) : submissionCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ru' ? 'Решение отправлено' : 'Solution Submitted'}</span>
              </>
            ) : (
              <>
                <span>
  {lang === 'ru'
      ? 'Отправить и перейти к Live Verification'
      : 'Submit & Continue to Live Verification'}
</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
