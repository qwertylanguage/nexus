import React from 'react';
import {
    ArrowLeft,
    CheckCircle2,
    User,
    FileCode2,
    Activity,
    MessageSquareText,
    ShieldCheck,
    Sparkles
} from 'lucide-react';

interface CandidateEvidenceProps {
    onBack: () => void;
    lang: 'en' | 'ru';
}

export const CandidateEvidence: React.FC<CandidateEvidenceProps> = ({
                                                                        onBack,
                                                                        lang
                                                                    }) => {
    const skills = [
        'Distributed Systems',
        'Go',
        'Debugging'
    ];

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-6">

            <button
                type="button"
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                {lang === 'ru' ? 'Назад к кандидатам' : 'Back to Candidates'}
            </button>

            {/* Candidate Header */}
            <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-6 sm:p-8">

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                    <div className="flex items-center gap-4">

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-white/[0.08] flex items-center justify-center text-cyan-300">
                            <User className="w-6 h-6" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2 flex-wrap">

                                <h1 className="text-2xl font-black text-white">
                                    Alex Chen
                                </h1>

                                <span className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  VERIFIED
                </span>

                            </div>

                            <p className="text-sm text-slate-400 mt-1">
                                Backend Engineering Internship
                            </p>
                        </div>

                    </div>

                    <div className="text-left sm:text-right">
                        <div className="text-xs font-mono text-slate-500">
                            TWIN PASSPORT
                        </div>

                        <div className="text-sm text-cyan-400 font-bold mt-1">
                            3 {lang === 'ru' ? 'подтверждённых навыка' : 'verified skills'}
                        </div>
                    </div>

                </div>
            </div>

            {/* Skills */}
            <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-6">

                <div className="flex items-center gap-2 mb-5">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />

                    <h2 className="font-bold text-white">
                        {lang === 'ru' ? 'Подтверждённые навыки' : 'Verified Skills'}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                    {skills.map((skill) => (
                        <div
                            key={skill}
                            className="rounded-2xl bg-black/30 border border-white/[0.07] p-4"
                        >
                            <div className="flex items-center justify-between gap-2">

                <span className="text-sm font-bold text-white">
                  {skill}
                </span>

                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />

                            </div>

                            <div className="text-[10px] font-mono text-emerald-400 mt-2">
                                VERIFIED BY EVIDENCE
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            {/* Evidence */}
            <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] overflow-hidden">

                <div className="px-6 py-5 border-b border-white/[0.08] flex items-center justify-between">

                    <div>
                        <div className="text-xs font-mono text-cyan-400 font-bold">
                            EVIDENCE #001
                        </div>

                        <h2 className="text-lg font-bold text-white mt-1">
                            Raft Consensus Debugging
                        </h2>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
            VERIFIED
          </span>

                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">

                    {/* Practical Task */}
                    <div className="rounded-2xl bg-black/30 border border-white/[0.07] p-4">

                        <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
                            <FileCode2 className="w-4 h-4" />
                        </div>

                        <div className="text-sm font-bold text-white">
                            {lang === 'ru' ? 'Практическая задача' : 'Practical Task'}
                        </div>

                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            {lang === 'ru'
                                ? 'Исправление поведения Raft consensus при конфликте term.'
                                : 'Fixed Raft consensus behavior during a term conflict.'}
                        </p>

                    </div>

                    {/* Work Session */}
                    <div className="rounded-2xl bg-black/30 border border-white/[0.07] p-4">

                        <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                            <Activity className="w-4 h-4" />
                        </div>

                        <div className="text-sm font-bold text-white">
                            Work Session
                        </div>

                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            {lang === 'ru'
                                ? 'Зафиксированы действия человека, обращения к AI и финальные изменения.'
                                : 'Human actions, AI interactions and final edits were recorded.'}
                        </p>

                    </div>

                    {/* Verification */}
                    <div className="rounded-2xl bg-black/30 border border-white/[0.07] p-4">

                        <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                            <MessageSquareText className="w-4 h-4" />
                        </div>

                        <div className="text-sm font-bold text-white">
                            Live Verification
                        </div>

                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            {lang === 'ru'
                                ? 'Кандидат последовательно объяснил ключевые решения после выполнения задачи.'
                                : 'Candidate explained key decisions after completing the task.'}
                        </p>

                    </div>

                </div>

                {/* Evidence chain */}
                <div className="mx-6 mb-6 rounded-2xl bg-cyan-500/[0.03] border border-cyan-500/10 p-4">

                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" />

                        <span className="text-xs font-bold text-white">
              Evidence Chain
            </span>
                    </div>

                    <p className="text-xs font-mono text-slate-400 leading-relaxed">
                        Practical Task → Work Session → Human/AI Trace → Submission → Live Verification → Evidence
                    </p>

                </div>

            </div>

            {/* Principle */}
            <div className="text-center py-2">
                <p className="text-xs text-slate-500">
                    {lang === 'ru'
                        ? 'Решение о кандидате принимает компания на основе проверяемых Evidence — не непрозрачного AI-score.'
                        : 'The company makes the hiring decision using inspectable evidence — not an opaque AI score.'}
                </p>

                <div className="text-xs font-mono text-cyan-500/70 mt-2">
                    Evidence &gt; Score
                </div>
            </div>

        </div>
    );
};