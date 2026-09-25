import React, { useState } from 'react';
import { Internship, UserRole } from '../types';
import { NexusLogo } from '../components/NexusLogo';
import { 
  Building2, 
  MapPin, 
  Clock, 
  DollarSign, 
  Users, 
  Search, 
  Plus, 
  ArrowRight, 
  Check, 
  Briefcase
} from 'lucide-react';

interface Stage3InternshipsProps {
  internships: Internship[];
  selectedInternship: Internship;
  onSelectInternship: (internship: Internship) => void;
  onAddInternship: (internship: Internship) => void;
  userRole: UserRole;
  onProceedToTasks: () => void;
  lang: 'en' | 'ru';
}

export const Stage3Internships: React.FC<Stage3InternshipsProps> = ({
  internships,
  selectedInternship,
  onSelectInternship,
  onAddInternship,
  userRole,
  onProceedToTasks,
  lang
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form for Company creating internship
  const [newTitle, setNewTitle] = useState('');
  const [newDept, setNewDept] = useState('');
  const [newStipend, setNewStipend] = useState('$7,000 / mo');
  const [newDuration, setNewDuration] = useState('12 weeks');
  const [newLocation, setNewLocation] = useState('San Francisco, CA / Remote');
  const [newDesc, setNewDesc] = useState('');
  const [newSkills, setNewSkills] = useState('Raft, Go, Distributed Systems');

  const filteredInternships = internships.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (filterType === 'All') return matchesSearch;
    return matchesSearch && item.type.toLowerCase() === filterType.toLowerCase();
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Internship = {
      id: `intern-${Date.now()}`,
      companyName: 'Apex Distributed Labs',
      companyLogoText: 'APEX',
      title: newTitle,
      department: newDept || 'Engineering',
      location: newLocation,
      type: 'Full-time',
      stipend: newStipend,
      duration: newDuration,
      spots: 2,
      applicantsCount: 1,
      tags: newSkills.split(',').map((s) => s.trim()).filter(Boolean),
      description: newDesc || 'Solve cutting-edge problems with human reasoning and verified AI tooling.',
      tasksCount: 2,
      requiredSkills: newSkills.split(',').map((s) => s.trim()).filter(Boolean),
      matchScore: 95
    };

    onAddInternship(created);
    onSelectInternship(created);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6 select-none">
      {/* Top Editorial Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              {lang === 'ru' ? 'Шаг 3' : 'Step 3'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-400">
              {userRole === 'STUDENT' ? (lang === 'ru' ? 'Каталог' : 'Catalog') : (lang === 'ru' ? 'Управление' : 'Portal')}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {userRole === 'STUDENT'
              ? lang === 'ru' ? 'Стажировки' : 'Internships'
              : lang === 'ru' ? 'Программы компании' : 'Company Programs'}
          </h2>
        </div>

        {/* Company Quick Action */}
        {userRole === 'COMPANY' && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'ru' ? 'Создать стажировку' : 'Create Internship'}</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/[0.02] p-2.5 rounded-2xl border border-white/[0.08]">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
          <input
            type="text"
            placeholder={lang === 'ru' ? 'Поиск стажировок...' : 'Search internships...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs placeholder:text-slate-500 focus:outline-none focus:border-cyan-500/60 font-sans"
          />
        </div>

        <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/[0.06] shrink-0">
          {['All', 'Full-time', 'Part-time'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                filterType === type
                  ? 'bg-white/[0.1] text-cyan-300 shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Internship Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredInternships.map((intern) => {
          const isSelected = intern.id === selectedInternship.id;
          return (
            <div
              key={intern.id}
              onClick={() => onSelectInternship(intern)}
              className={`rounded-2xl p-5 border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-[#10141e] border-cyan-500/80 shadow-[0_10px_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40'
                  : 'bg-[#0d1017]/80 border-white/[0.08] hover:border-white/[0.2] hover:bg-[#111520]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center font-bold text-white text-xs font-mono">
                      {intern.companyLogoText}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white truncate max-w-[130px]">
                        {intern.companyName}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {intern.department}
                      </div>
                    </div>
                  </div>

                  <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                    {intern.matchScore}%
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white line-clamp-1 mb-1.5">
                  {intern.title}
                </h3>

                <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
                  {intern.description}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mb-4 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.06]">
                  <div className="flex items-center gap-1.5 truncate">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="font-semibold text-slate-200">{intern.stipend}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{intern.duration}</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {intern.tags.slice(0, 3).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom selection state */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500">
                  {intern.tasksCount} {lang === 'ru' ? 'задачи' : 'tasks'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectInternship(intern);
                    onProceedToTasks();
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 shadow-sm'
                      : 'bg-white/[0.06] text-slate-300 hover:bg-white/[0.12]'
                  }`}
                >
                  <span>{lang === 'ru' ? 'Выбрать' : 'Select'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">
              {selectedInternship.title}
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              {selectedInternship.companyName} · {selectedInternship.stipend}
            </div>
          </div>
        </div>

        <button
          onClick={onProceedToTasks}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-sm cursor-pointer"
        >
          <span>{lang === 'ru' ? 'Перейти к задачам (Шаг 4)' : 'Proceed to Tasks (Step 4)'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Modal for Company to Create New Internship */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#0f121a] border border-white/[0.12] shadow-2xl p-6 text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">
                {lang === 'ru' ? 'Новая стажировка' : 'New Internship'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {lang === 'ru' ? 'Название роли' : 'Program Title'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus Intern"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-cyan-500/60 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    {lang === 'ru' ? 'Отдел' : 'Department'}
                  </label>
                  <input
                    type="text"
                    placeholder="Core Engineering"
                    value={newDept}
                    onChange={(e) => setNewDept(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-cyan-500/60 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    {lang === 'ru' ? 'Стипендия' : 'Stipend'}
                  </label>
                  <input
                    type="text"
                    value={newStipend}
                    onChange={(e) => setNewStipend(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-cyan-500/60 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {lang === 'ru' ? 'Описание' : 'Description'}
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Short description..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-cyan-500/60 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {lang === 'ru' ? 'Навыки (через запятую)' : 'Skills'}
                </label>
                <input
                  type="text"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-cyan-500/60 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-white/[0.1] text-slate-400 text-xs hover:text-white cursor-pointer"
                >
                  {lang === 'ru' ? 'Отмена' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  {lang === 'ru' ? 'Опубликовать' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
