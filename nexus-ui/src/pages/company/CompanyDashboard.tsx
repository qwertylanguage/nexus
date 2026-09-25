import React from 'react';
import {
    BriefcaseBusiness,
    Users,
    ListChecks,
    Plus,
    ArrowRight,
    CheckCircle2
} from 'lucide-react';

interface CompanyDashboardProps {
    onCreateInternship: () => void;
    onViewCandidates: () => void;
    lang: 'en' | 'ru';
}

export const CompanyDashboard: React.FC<CompanyDashboardProps> = ({
                                                                      onCreateInternship,
                                                                      onViewCandidates,
                                                                      lang
                                                                  }) => {
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
          <span className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase">
            {lang === 'ru' ? 'Company Workspace' : 'Company Workspace'}
          </span>

                    <h1 className="text-3xl sm:text-4xl font-black text-white mt-2">
                        {lang === 'ru' ? 'Панель компании' : 'Company Dashboard'}
                    </h1>

                    <p className="text-slate-400 text-sm mt-2 max-w-xl">
                        {lang === 'ru'
                            ? 'Создавайте стажировки и проверяйте навыки кандидатов через реальные Evidence.'
                            : 'Create internships and verify candidate skills through real evidence.'}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCreateInternship}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                >
                    <Plus className="w-4 h-4" />
                    {lang === 'ru' ? 'Создать стажировку' : 'Create Internship'}
                </button>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-5">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                        <BriefcaseBusiness className="w-5 h-5" />
                    </div>

                    <div className="text-2xl font-black text-white">2</div>

                    <div className="text-xs text-slate-500 mt-1">
                        {lang === 'ru' ? 'Активные стажировки' : 'Active Internships'}
                    </div>
                </div>

                <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
                        <ListChecks className="w-5 h-5" />
                    </div>

                    <div className="text-2xl font-black text-white">6</div>

                    <div className="text-xs text-slate-500 mt-1">
                        {lang === 'ru' ? 'Практических заданий' : 'Practical Tasks'}
                    </div>
                </div>

                <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] p-5">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                        <Users className="w-5 h-5" />
                    </div>

                    <div className="text-2xl font-black text-white">12</div>

                    <div className="text-xs text-slate-500 mt-1">
                        {lang === 'ru' ? 'Кандидатов' : 'Candidates'}
                    </div>
                </div>

            </div>

            {/* Internship */}
            <div className="rounded-3xl bg-[#0e1118] border border-white/[0.08] overflow-hidden">

                <div className="px-6 py-5 border-b border-white/[0.08]">
                    <h2 className="font-bold text-white">
                        {lang === 'ru' ? 'Активная стажировка' : 'Active Internship'}
                    </h2>
                </div>

                <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                    <div className="space-y-3">

                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold text-white">
                                Backend Engineering Internship
                            </h3>

                            <span className="px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                ACTIVE
              </span>
                        </div>

                        <p className="text-sm text-slate-400 max-w-xl">
                            {lang === 'ru'
                                ? 'Распределённые системы, backend engineering и практическая работа с production-like задачами.'
                                : 'Distributed systems, backend engineering and production-like practical tasks.'}
                        </p>

                        <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-500">
                            <span>3 Tasks</span>
                            <span>12 Candidates</span>

                            <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Evidence enabled
              </span>
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onViewCandidates}
                        className="px-5 py-3 rounded-2xl bg-white/[0.05] border border-white/[0.1] text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-white/[0.08] transition-colors shrink-0"
                    >
                        {lang === 'ru' ? 'Посмотреть кандидатов' : 'View Candidates'}
                        <ArrowRight className="w-4 h-4" />
                    </button>

                </div>
            </div>

            {/* Principle */}
            <div className="text-center">
        <span className="text-xs font-mono text-slate-600">
          NEXUS · Evidence &gt; Score
        </span>
            </div>

        </div>
    );
};