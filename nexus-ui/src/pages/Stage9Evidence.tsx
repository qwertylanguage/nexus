import React, { useState } from 'react';
import { WorkEvent, InternshipTask } from '../types';
import {
  ShieldCheck,
  Cpu,
  CheckCircle2,
  ArrowRight,
  Award,
  Layers,
  Activity,
  MessageSquare
} from 'lucide-react';

interface Stage9EvidenceProps {
  task: InternshipTask;
  workEvents: WorkEvent[];
  onMintPassport: () => void;
  lang: 'en' | 'ru';
}

export const Stage9Evidence: React.FC<Stage9EvidenceProps> = ({
                                                                task,
                                                                workEvents,
                                                                onMintPassport,
                                                                lang
                                                              }) => {
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = () => {
    setIsMinting(true);

    setTimeout(() => {
      setIsMinting(false);
      onMintPassport();
    }, 900);
  };

  const humanEvents = workEvents.filter((e) => e.actor === 'HUMAN').length;
  const aiEvents = workEvents.filter((e) => e.actor === 'AI').length;
  const totalEvents = humanEvents + aiEvents;

  const humanRatio =
      totalEvents > 0
          ? Math.round((humanEvents / totalEvents) * 100)
          : 0;

  const aiRatio =
      totalEvents > 0
          ? 100 - humanRatio
          : 0;

  return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-left space-y-6 select-none">

        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
          {lang === 'ru'
              ? 'Шаг 9 · Доказательства'
              : 'Step 9 · Evidence'}
        </span>

          <h2 className="text-3xl font-black text-white tracking-tight">
            {lang === 'ru'
                ? 'Пакет доказательств'
                : 'Evidence Manifest'}
          </h2>

          <p className="text-slate-400 text-xs sm:text-sm">
            {lang === 'ru'
                ? 'Nexus связывает выполненную задачу, историю работы и Live Verification в единый набор доказательств навыков.'
                : 'Nexus connects the completed task, work history and Live Verification into a single skill evidence record.'}
          </p>
        </div>

        {/* Main Evidence Card */}
        <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-6 sm:p-8 space-y-6">

          {/* Verification banner */}
          <div className="p-4 rounded-2xl bg-emerald-500/[0.06] border border-emerald-500/20">
            <div className="flex items-start gap-3">

              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>

              <div>
                <div className="text-sm font-bold text-white">
                  {lang === 'ru'
                      ? 'Evidence Bundle сформирован'
                      : 'Evidence Bundle Generated'}
                </div>

                <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {lang === 'ru'
                      ? 'Практическая работа и ответы Live Verification связаны с этой задачей.'
                      : 'Practical work and Live Verification responses are linked to this task.'}
                </div>
              </div>

            </div>
          </div>

          {/* Evidence sources */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

            {/* Work session */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">

              <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Activity className="w-4 h-4 text-cyan-400" />
              </div>

              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Work Session
              </div>

              <div className="text-base font-bold text-white">
                {workEvents.length} Events
              </div>

              <div className="text-[10px] text-slate-400">
                {lang === 'ru'
                    ? 'История процесса сохранена'
                    : 'Process history recorded'}
              </div>

            </div>

            {/* Verification */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">

              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-purple-400" />
              </div>

              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Live Verification
              </div>

              <div className="text-base font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Verified
              </div>

              <div className="text-[10px] text-slate-400">
                {lang === 'ru'
                    ? '3 ответа зафиксированы'
                    : '3 responses recorded'}
              </div>

            </div>

            {/* Skills */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2">

              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Award className="w-4 h-4 text-blue-400" />
              </div>

              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Skill Evidence
              </div>

              <div className="text-base font-bold text-white">
                3 Skills
              </div>

              <div className="text-[10px] text-slate-400">
                {lang === 'ru'
                    ? 'Подтверждены работой'
                    : 'Backed by practical work'}
              </div>

            </div>

          </div>

          {/* Human + AI telemetry */}
          <div className="rounded-2xl bg-black/30 border border-white/[0.06] p-4">

            <div className="flex items-center justify-between mb-3">

              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  Human + AI Telemetry
                </div>

                <div className="text-[10px] text-slate-500 mt-1">
                  {lang === 'ru'
                      ? 'Как формировалось решение'
                      : 'How the solution was produced'}
                </div>
              </div>

              <div className="text-xs font-mono text-slate-400">
                {totalEvents} events
              </div>

            </div>

            <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden flex">
              <div
                  className="bg-cyan-400 transition-all"
                  style={{ width: `${humanRatio}%` }}
              />

              <div
                  className="bg-purple-500 transition-all"
                  style={{ width: `${aiRatio}%` }}
              />
            </div>

            <div className="flex justify-between mt-2 text-[10px] font-mono">

            <span className="text-cyan-400">
              Human {humanRatio}%
            </span>

              <span className="text-purple-400">
              AI {aiRatio}%
            </span>

            </div>

          </div>

          {/* Evidence principle */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
            <Layers className="w-3.5 h-3.5" />
            <span>
            {lang === 'ru'
                ? 'Evidence > Score · навыки подтверждаются действиями'
                : 'Evidence > Score · skills are backed by actions'}
          </span>
          </div>

          {/* Step 10 */}
          <div className="pt-2">

            <button
                type="button"
                onClick={handleMint}
                disabled={isMinting}
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
            >

              {isMinting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />

                    <span>
                  {lang === 'ru'
                      ? 'Формирование паспорта...'
                      : 'Generating Passport...'}
                </span>
                  </>
              ) : (
                  <>
                <span>
                  {lang === 'ru'
                      ? 'Добавить Evidence в TWIN Passport'
                      : 'Add Evidence to TWIN Passport'}
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