import React, { useState } from 'react';
import { Internship, InternshipTask, UserRole } from '../types';
import { 
  CheckCircle2, 
  Plus, 
  ArrowRight, 
  Sliders, 
  Clock, 
  Check, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface Stage4TasksProps {
  internship: Internship;
  tasks: InternshipTask[];
  selectedTask: InternshipTask;
  onSelectTask: (task: InternshipTask) => void;
  onAddTask: (task: InternshipTask) => void;
  userRole: UserRole;
  onProceedToStart: () => void;
  lang: 'en' | 'ru';
}

export const Stage4Tasks: React.FC<Stage4TasksProps> = ({
  internship,
  tasks,
  selectedTask,
  onSelectTask,
  onAddTask,
  userRole,
  onProceedToStart,
  lang
}) => {
  const [hasApplied, setHasApplied] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Form state for Company adding a task
  const [taskTitle, setTaskTitle] = useState('');
  const [taskHours, setTaskHours] = useState('2.5 hours');
  const [taskDifficulty, setTaskDifficulty] = useState<'Entry' | 'Intermediate' | 'Advanced' | 'Senior'>('Advanced');
  const [taskOverview, setTaskOverview] = useState('');
  const [taskSkills, setTaskSkills] = useState('Distributed Consensus, Go');
  const [humanWeight, setHumanWeight] = useState(40);
  const [aiWeight, setAiWeight] = useState(30);

  const handleApplyToggle = () => {
    setHasApplied(true);
  };

  const handleAddTaskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    const newTask: InternshipTask = {
      id: `task-${Date.now()}`,
      internshipId: internship.id,
      title: taskTitle,
      estimatedHours: taskHours,
      difficulty: taskDifficulty,
      overview: taskOverview || 'Analyze system state transitions and provide resilient recovery proof.',
      deliverables: [
        'Architecture topology model on Canvas',
        'Production verified code patch'
      ],
      skillsTested: taskSkills.split(',').map((s) => s.trim()).filter(Boolean),
      rubric: {
        humanReasoningWeight: humanWeight,
        aiOrchestrationWeight: aiWeight,
        codeQualityWeight: 100 - (humanWeight + aiWeight)
      }
    };

    onAddTask(newTask);
    onSelectTask(newTask);
    setShowTaskModal(false);
    setTaskTitle('');
    setTaskOverview('');
  };

  const currentInternshipTasks = tasks.filter(
    (t) => t.internshipId === internship.id || !t.internshipId
  );
  const displayTasks = currentInternshipTasks.length > 0 ? currentInternshipTasks : tasks;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 text-left space-y-6 select-none">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              {lang === 'ru' ? 'Шаг 4' : 'Step 4'}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-400 truncate max-w-[200px]">
              {internship.companyName}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {internship.title}
          </h2>
        </div>

        {/* Action Header Button depending on role */}
        <div className="flex items-center gap-3 shrink-0">
          {userRole === 'STUDENT' ? (
            <button
              onClick={handleApplyToggle}
              className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                hasApplied
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm'
              }`}
            >
              {hasApplied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'ru' ? 'Отклик принят' : 'Applied'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{lang === 'ru' ? 'Откликнуться' : 'Apply'}</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={() => setShowTaskModal(true)}
              className="px-4 py-2 rounded-xl font-bold text-xs text-white bg-purple-600 hover:bg-purple-500 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{lang === 'ru' ? 'Добавить задачу' : 'Add Task'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Tasks List on Left, Active Rubric / Task Detail on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left column: List of tasks */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono text-slate-500 px-1">
            {lang === 'ru' ? 'Квалификационные задачи' : 'Tasks'} ({displayTasks.length})
          </div>

          <div className="space-y-3">
            {displayTasks.map((task) => {
              const isSelected = task.id === selectedTask.id;
              return (
                <div
                  key={task.id}
                  onClick={() => onSelectTask(task)}
                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#10141e] border-cyan-500/80 shadow-[0_8px_24px_rgba(6,182,212,0.14)] ring-1 ring-cyan-500/40'
                      : 'bg-[#0d1017]/80 border-white/[0.08] hover:border-white/[0.2] hover:bg-[#111520]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        task.difficulty === 'Advanced'
                          ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                          : 'bg-blue-500/10 text-blue-300 border border-blue-500/30'
                      }`}
                    >
                      {task.difficulty}
                    </span>

                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-cyan-400" />
                      {task.estimatedHours}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5 leading-snug">
                    {task.title}
                  </h4>

                  <p className="text-xs text-slate-400 line-clamp-2 mb-3 leading-relaxed">
                    {task.overview}
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {task.skillsTested.map((s, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono bg-white/[0.04] px-2 py-0.5 rounded text-slate-300 border border-white/[0.06]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right column: Deep Task Inspector & Evaluation Rubric */}
        <div className="lg:col-span-7 bg-[#0e1118] rounded-3xl border border-white/[0.08] p-6 space-y-6">
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="text-xs font-mono text-cyan-400 font-bold uppercase mb-1">
                {lang === 'ru' ? 'Выбранная задача' : 'Selected Task'}
              </div>
              <h3 className="text-xl font-bold text-white leading-snug">
                {selectedTask.title}
              </h3>
            </div>

            <div className="px-3 py-1 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold shrink-0">
              {selectedTask.difficulty}
            </div>
          </div>

          {/* Overview text */}
          <div>
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/[0.06] text-xs text-slate-300 leading-relaxed font-mono">
              {selectedTask.overview}
            </div>
          </div>

          {/* Deliverables Checklist */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
              {lang === 'ru' ? 'Артефакты' : 'Deliverables'}
            </h4>
            <div className="space-y-2">
              {selectedTask.deliverables.map((del, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evaluation Rubric Calibration */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5 font-mono">
                <Sliders className="w-4 h-4 text-purple-400" />
                {lang === 'ru' ? 'Рубрика оценки' : 'Evaluation Rubric'}
              </span>
              <span className="text-[11px] font-mono text-slate-500">100%</span>
            </div>

            {/* Visual Multi-bar */}
            <div className="w-full h-2.5 rounded-full bg-black/60 overflow-hidden flex">
              <div 
                style={{ width: `${selectedTask.rubric.humanReasoningWeight}%` }}
                className="bg-cyan-500 h-full"
              />
              <div 
                style={{ width: `${selectedTask.rubric.aiOrchestrationWeight}%` }}
                className="bg-purple-500 h-full"
              />
              <div 
                style={{ width: `${selectedTask.rubric.codeQualityWeight}%` }}
                className="bg-blue-500 h-full"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 shrink-0" />
                <span className="text-slate-300">{selectedTask.rubric.humanReasoningWeight}% Human</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0" />
                <span className="text-slate-300">{selectedTask.rubric.aiOrchestrationWeight}% AI</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                <span className="text-slate-300">{selectedTask.rubric.codeQualityWeight}% Quality</span>
              </div>
            </div>
          </div>

          {/* Action Trigger to proceed to Stage 5 Start Task */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <AlertCircle className="w-4 h-4 text-cyan-400" />
              <span>{lang === 'ru' ? 'Готово к запуску' : 'Ready to start'}</span>
            </div>

            <button
              onClick={onProceedToStart}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <span>{lang === 'ru' ? 'Запустить задачу (Шаг 5)' : 'Start Task (Step 5)'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Modal for Company to Add Custom Task */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#0f121a] border border-white/[0.12] shadow-2xl p-6 text-left space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">
                {lang === 'ru' ? 'Новая инженерная задача' : 'Add Task'}
              </h3>
              <button
                onClick={() => setShowTaskModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer text-sm p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {lang === 'ru' ? 'Название задачи' : 'Task Title'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asymmetric Raft Partition Reconciler"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-cyan-500/60 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    {lang === 'ru' ? 'Время' : 'Hours'}
                  </label>
                  <input
                    type="text"
                    value={taskHours}
                    onChange={(e) => setTaskHours(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-cyan-500/60 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    {lang === 'ru' ? 'Сложность' : 'Difficulty'}
                  </label>
                  <select
                    value={taskDifficulty}
                    onChange={(e) => setTaskDifficulty(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-cyan-500/60 focus:outline-none"
                  >
                    <option value="Entry">Entry</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Senior">Senior</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  {lang === 'ru' ? 'Постановка задачи' : 'Problem Overview'}
                </label>
                <textarea
                  rows={2}
                  value={taskOverview}
                  onChange={(e) => setTaskOverview(e.target.value)}
                  placeholder="Describe failure scenario..."
                  className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/[0.08] text-white text-xs focus:border-cyan-500/60 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-3 py-1.5 rounded-xl border border-white/[0.1] text-slate-400 text-xs hover:text-white cursor-pointer"
                >
                  {lang === 'ru' ? 'Отмена' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  {lang === 'ru' ? 'Сохранить' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
