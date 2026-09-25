import React from 'react';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    User,
    BriefcaseBusiness
} from 'lucide-react';

interface CandidatesProps {
    onBack: () => void;
    onViewCandidate: () => void;
    lang: 'en' | 'ru';
}

export const Candidates: React.FC<CandidatesProps> = ({
                                                          onBack,
                                                          onViewCandidate,
                                                          lang
                                                      }) => {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                {lang === 'ru' ? 'Назад к компании' : 'Back to Company'}
            </button>

            <div>
        <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
          Company Workspace
        </span>

                <h1 className="text-3xl font-black text-white mt-2">
                    {lang === 'ru' ? 'Кандидаты' : 'Candidates'}
                </h1>

                <div className="flex items-center gap-2 text-sm text-slate-400 mt-2">
                    <BriefcaseBusiness className="w-4 h-4" />
                    Backend Engineering Internship
                </div>
            </div>

            <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] overflow-hidden">

                <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <span className="text-xs font-mono text-slate-500">
            3 {lang === 'ru' ? 'кандидата' : 'candidates'}
          </span>

                    <span className="text-xs font-mono text-slate-600">
            Evidence &gt; Score
          </span>
                </div>

                {/* Candidate 1 */}
                <button
                    type="button"
                    onClick={onViewCandidate}
                    className="w-full p-6 flex items-center justify-between gap-4 text-left hover:bg-white/[0.03] transition-colors border-b border-white/[0.06]"
                >
                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/[0.08] flex items-center justify-center text-cyan-300">
                            <User className="w-5 h-5" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-white">
                                    Alex Chen
                                </h3>

                                <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  VERIFIED
                </span>
                            </div>

                            <p className="text-xs text-slate-500 mt-1">
                                {lang === 'ru'
                                    ? 'Backend Engineering · 3 подтверждённых навыка'
                                    : 'Backend Engineering · 3 verified skills'}
                            </p>
                        </div>

                    </div>

                    <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-cyan-400 font-mono">
              {lang === 'ru' ? 'Смотреть Evidence' : 'View Evidence'}
            </span>

                        <ArrowRight className="w-4 h-4 text-slate-500" />
                    </div>
                </button>

                {/* Candidate 2 */}
                <div className="p-6 flex items-center justify-between gap-4 border-b border-white/[0.06] opacity-70">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500">
                            <User className="w-5 h-5" />
                        </div>

                        <div>
                            <h3 className="font-bold text-white">
                                Maya Rodriguez
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                                {lang === 'ru'
                                    ? 'Выполняет практическое задание'
                                    : 'Practical task in progress'}
                            </p>
                        </div>

                    </div>

                    <span className="text-[10px] font-mono text-amber-400">
            IN PROGRESS
          </span>

                </div>

                {/* Candidate 3 */}
                <div className="p-6 flex items-center justify-between gap-4 opacity-70">

                    <div className="flex items-center gap-4">

                        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-500">
                            <User className="w-5 h-5" />
                        </div>

                        <div>
                            <h3 className="font-bold text-white">
                                Daniel Kim
                            </h3>

                            <p className="text-xs text-slate-500 mt-1">
                                {lang === 'ru'
                                    ? 'Заявка принята · задание ещё не начато'
                                    : 'Application accepted · task not started'}
                            </p>
                        </div>

                    </div>

                    <span className="text-[10px] font-mono text-slate-500">
            PENDING
          </span>

                </div>

            </div>

            <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.03] p-4">
                <p className="text-xs text-slate-400 leading-relaxed">
                    {lang === 'ru'
                        ? 'Nexus не ранжирует кандидатов по непрозрачному AI-score. Компания изучает подтверждённые Evidence: выполненную работу, WorkEvents и Live Verification.'
                        : 'Nexus does not rank candidates using an opaque AI score. Companies inspect verified evidence: completed work, WorkEvents and Live Verification.'}
                </p>
            </div>

        </div>
    );
};