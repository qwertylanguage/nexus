import React from 'react';
import { UserRole } from '../types';
import { NexusLogo } from '../components/NexusLogo';
import { 
  User, 
  Building2, 
  ArrowRight, 
  Sparkles,
  Check
} from 'lucide-react';

interface Stage2RoleSelectionProps {
  currentRole: UserRole;
  onSelectRole: (role: UserRole) => void;
  lang: 'en' | 'ru';
}

export const Stage2RoleSelection: React.FC<Stage2RoleSelectionProps> = ({
  currentRole,
  onSelectRole,
  lang
}) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] w-full flex flex-col justify-between max-w-7xl mx-auto px-6 sm:px-12 py-8 select-none">
      
      {/* Top Header */}
      <div className="w-full flex items-center justify-between pb-6">
        <NexusLogo size="md" theme="dark" animated />
        <div className="text-xs font-mono text-slate-500">
          {lang === 'ru' ? 'Шаг 2 из 10' : 'Step 2 of 10'}
        </div>
      </div>

      {/* Center Main Stage Content */}
      <div className="my-auto py-6 max-w-4xl mx-auto w-full text-center space-y-10">
        
        {/* Clean Minimalist Titles */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            {lang === 'ru' ? 'Выбор роли' : 'Role Selection'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            {lang === 'ru'
              ? 'Выберите, как вы хотите использовать Nexus. Вы всегда сможете сменить роль в настройках.'
              : 'Choose how you want to use Nexus. You can always switch roles in settings.'}
          </p>
        </div>

        {/* Dual Cards Grid matching Image 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-3xl mx-auto w-full">
          
          {/* STUDENT CARD */}
          <div
            onClick={() => onSelectRole('STUDENT')}
            className={`group relative rounded-[28px] p-8 sm:p-10 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center ${
              currentRole === 'STUDENT'
                ? 'bg-[#11141d]/90 border-2 border-cyan-500/80 shadow-[0_20px_50px_rgba(6,182,212,0.18)] ring-1 ring-cyan-500/40'
                : 'bg-[#0e1118]/70 border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#121620]'
            }`}
          >
            {/* Top Micro-dots decoration and Icon Halo */}
            <div className="relative mb-6 flex flex-col items-center">
              {/* Background decorative dots */}
              <div className="absolute -top-3 -left-6 grid grid-cols-3 gap-1 opacity-25">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-cyan-400" />
                ))}
              </div>

              {/* Icon Circle with Soft Gradient Halo */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(34,211,238,0.1)] group-hover:scale-105 transition-transform duration-300">
                <User className="w-10 h-10 text-cyan-400 stroke-[1.8]" />
                
                {/* Subtle sparkle accent */}
                <div className="absolute -bottom-1 -right-1 text-cyan-300">
                  <Sparkles className="w-4 h-4 opacity-75" />
                </div>
              </div>
            </div>

            {/* Title & Short Clean Description */}
            <div className="space-y-3 mb-8">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Student
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                {lang === 'ru'
                  ? 'Найдите стажировки и докажите навыки через задачи.'
                  : 'Find engineering internships and prove your skills through benchmarks.'}
              </p>
            </div>

            {/* Action Button */}
            <button
              type="button"
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                currentRole === 'STUDENT'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-200'
              }`}
            >
              <span>{lang === 'ru' ? 'Я студент' : 'I am a student'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* COMPANY CARD */}
          <div
            onClick={() => onSelectRole('COMPANY')}
            className={`group relative rounded-[28px] p-8 sm:p-10 cursor-pointer transition-all duration-300 flex flex-col items-center justify-between text-center ${
              currentRole === 'COMPANY'
                ? 'bg-[#11141d]/90 border-2 border-purple-500/90 shadow-[0_20px_50px_rgba(168,85,247,0.22)] ring-1 ring-purple-500/40'
                : 'bg-[#0e1118]/70 border border-white/[0.08] hover:border-white/[0.2] hover:bg-[#121620]'
            }`}
          >
            {/* Top Micro-dots decoration and Icon Halo */}
            <div className="relative mb-6 flex flex-col items-center">
              {/* Background decorative dots */}
              <div className="absolute -top-3 -left-6 grid grid-cols-3 gap-1 opacity-25">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="w-1 h-1 rounded-full bg-purple-400" />
                ))}
              </div>

              {/* Icon Circle with Soft Gradient Halo */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(192,132,252,0.12)] group-hover:scale-105 transition-transform duration-300">
                <Building2 className="w-10 h-10 text-purple-400 stroke-[1.8]" />
                
                {/* Subtle sparkle accent */}
                <div className="absolute -bottom-1 -right-1 text-purple-300">
                  <Sparkles className="w-4 h-4 opacity-75" />
                </div>
              </div>
            </div>

            {/* Title & Short Clean Description */}
            <div className="space-y-3 mb-8">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Company
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm max-w-xs mx-auto leading-relaxed">
                {lang === 'ru'
                  ? 'Создавайте стажировки и оценивайте подтвержденные навыки.'
                  : 'Create internships and evaluate telemetry-verified candidate skills.'}
              </p>
            </div>

            {/* Action Button */}
            <button
              type="button"
              className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 ${
                currentRole === 'COMPANY'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/[0.08] hover:bg-white/[0.14] text-slate-200'
              }`}
            >
              <span>{lang === 'ru' ? 'Я компания' : 'I am a company'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Minimalist Navigation Bar matching Image 1 */}
      <div className="w-full border-t border-white/[0.06] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-400">
        <NexusLogo size="sm" theme="dark" showWordmark={true} />

        <div className="flex flex-wrap items-center gap-6">
          <span className="hover:text-white transition-colors cursor-pointer">
            {lang === 'ru' ? 'Для студентов' : 'For students'}
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">
            {lang === 'ru' ? 'Для компаний' : 'For companies'}
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">
            {lang === 'ru' ? 'Как это работает' : 'How it works'}
          </span>
          <span className="hover:text-white transition-colors cursor-pointer">
            {lang === 'ru' ? 'О нас' : 'About'}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl border border-white/[0.1] hover:bg-white/[0.06] text-white text-xs font-semibold cursor-pointer"
          >
            {lang === 'ru' ? 'Войти' : 'Sign in'}
          </button>
          <button
            type="button"
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-sm cursor-pointer"
          >
            {lang === 'ru' ? 'Регистрация' : 'Register'}
          </button>
        </div>
      </div>

    </div>
  );
};
