import { useState, type FormEvent, type KeyboardEvent } from 'react';
import {
    Building2,
    Briefcase,
    FileCode2,
    Target,
    Clock,
    Gauge,
    Plus,
    X,
    AlertCircle,
    ArrowRight,
    ChevronDown,
    ShieldCheck,
} from 'lucide-react';

interface CreateTaskProps {
    internshipTitle?: string;
    onCancel: () => void;
    onCreated: (task: {
        title: string;
        description: string;
        objective: string;
        skills: string[];
        estimatedTime: string;
        difficulty: string;
    }) => void;
    lang: 'ru' | 'en';
}

const DIFFICULTIES = ['Junior', 'Middle', 'Advanced'] as const;

const TEXT = {
    en: {
        workspace: 'Company Workspace',
        heading: 'Create Practical Task',
        subheading:
            'A real problem the student solves in a work session. The result becomes verifiable evidence.',
        internship: 'Internship',
        noInternship: 'Internship not selected',
        sectionTask: 'Task',
        sectionSkills: 'Expected skills',
        skillsHint: 'Skills this task lets the student demonstrate.',
        title: 'Task title',
        titlePh: 'Raft Consensus Debugging',
        titleRequired: 'Task title is required',
        description: 'Task description',
        descriptionPh:
            'Investigate and fix incorrect leader behavior when a follower reports a higher term.',
        objective: 'Task objective',
        objectivePh:
            'Identify the consensus bug, implement a safe fix and explain your reasoning.',
        estimatedTime: 'Estimated time',
        estimatedTimePh: '60 minutes',
        difficulty: 'Difficulty',
        skillPh: 'Distributed Systems',
        add: 'Add',
        remove: 'Remove',
        noSkills: 'No skills added yet',
        evidenceTitle: 'This task will generate',
        evidenceSteps: [
            'Practical Task',
            'Work Session',
            'Human/AI Trace',
            'Live Verification',
            'Evidence',
        ],
        cancel: 'Cancel',
        create: 'Create Task',
        required: 'required',
    },

    ru: {
        workspace: 'Кабинет компании',
        heading: 'Создание практического задания',
        subheading:
            'Реальная задача, которую студент решает в рабочей сессии. Результат становится проверяемым evidence.',
        internship: 'Стажировка',
        noInternship: 'Стажировка не выбрана',
        sectionTask: 'Задание',
        sectionSkills: 'Ожидаемые навыки',
        skillsHint:
            'Навыки, которые студент продемонстрирует в этом задании.',
        title: 'Название задания',
        titlePh: 'Raft Consensus Debugging',
        titleRequired: 'Укажите название задания',
        description: 'Описание задания',
        descriptionPh:
            'Найти и исправить некорректное поведение лидера, когда follower сообщает более высокий term.',
        objective: 'Цель задания',
        objectivePh:
            'Найти ошибку консенсуса, реализовать безопасное исправление и объяснить своё решение.',
        estimatedTime: 'Оценка времени',
        estimatedTimePh: '60 минут',
        difficulty: 'Сложность',
        skillPh: 'Distributed Systems',
        add: 'Добавить',
        remove: 'Удалить',
        noSkills: 'Навыки пока не добавлены',
        evidenceTitle: 'Это задание создаст',
        evidenceSteps: [
            'Практическое задание',
            'Рабочая сессия',
            'Human/AI Trace',
            'Live Verification',
            'Evidence',
        ],
        cancel: 'Отмена',
        create: 'Создать задание',
        required: 'обязательно',
    },
} as const;

const inputClass =
    'w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20';

const labelClass =
    'mb-2 flex items-center gap-2 text-sm font-medium text-slate-300';

export const CreateTask = ({
                               internshipTitle,
                               onCancel,
                               onCreated,
                               lang,
                           }: CreateTaskProps) => {
    const t = TEXT[lang];

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [objective, setObjective] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [difficulty, setDifficulty] = useState<string>(DIFFICULTIES[0]);
    const [submitted, setSubmitted] = useState(false);

    const titleError = submitted && title.trim() === '';

    const addSkill = () => {
        const value = skillInput.trim();

        if (!value) return;

        const exists = skills.some(
            (s) => s.toLowerCase() === value.toLowerCase()
        );

        if (!exists) {
            setSkills((prev) => [...prev, value]);
        }

        setSkillInput('');
    };

    const removeSkill = (skill: string) => {
        setSkills((prev) => prev.filter((s) => s !== skill));
    };

    const handleSkillKeyDown = (
        event: KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addSkill();
        } else if (
            event.key === 'Backspace' &&
            skillInput === '' &&
            skills.length > 0
        ) {
            setSkills((prev) => prev.slice(0, -1));
        }
    };

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setSubmitted(true);

        if (title.trim() === '') return;

        onCreated({
            title: title.trim(),
            description: description.trim(),
            objective: objective.trim(),
            skills,
            estimatedTime: estimatedTime.trim(),
            difficulty,
        });
    };

    return (
        <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">

            <header className="mb-8">

                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-1 text-xs font-medium uppercase tracking-wider text-cyan-400">

                    <Building2
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                    />

                    {t.workspace}

                </div>

                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    {t.heading}
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                    {t.subheading}
                </p>

            </header>

            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-purple-400/20 bg-purple-400/[0.05] px-5 py-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple-400/30 bg-purple-400/10">

                    <Briefcase
                        className="h-5 w-5 text-purple-400"
                        aria-hidden="true"
                    />

                </div>

                <div className="min-w-0">

                    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                        {t.internship}
                    </p>

                    <p
                        className={`truncate text-base font-semibold ${
                            internshipTitle
                                ? 'text-white'
                                : 'text-slate-500'
                        }`}
                    >
                        {internshipTitle || t.noInternship}
                    </p>

                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
            >

                <section className="rounded-3xl border border-white/[0.08] bg-[#0e1118] p-5 sm:p-8">

                    <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">

                        <FileCode2
                            className="h-5 w-5 text-cyan-400"
                            aria-hidden="true"
                        />

                        {t.sectionTask}

                    </h2>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div className="md:col-span-2">

                            <label
                                htmlFor="task-title"
                                className={labelClass}
                            >
                                {t.title}

                                <span className="text-xs font-normal text-slate-500">
                  · {t.required}
                </span>

                            </label>

                            <input
                                id="task-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t.titlePh}
                                aria-invalid={titleError}
                                aria-describedby={
                                    titleError
                                        ? 'task-title-error'
                                        : undefined
                                }
                                className={`${inputClass} ${
                                    titleError
                                        ? 'border-rose-400/60 focus:border-rose-400/60 focus:ring-rose-400/20'
                                        : ''
                                }`}
                            />

                            {titleError && (

                                <p
                                    id="task-title-error"
                                    className="mt-2 flex items-center gap-1.5 text-sm text-rose-400"
                                >

                                    <AlertCircle
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    />

                                    {t.titleRequired}

                                </p>

                            )}

                        </div>

                        <div className="md:col-span-2">

                            <label
                                htmlFor="task-description"
                                className={labelClass}
                            >
                                {t.description}
                            </label>

                            <textarea
                                id="task-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={t.descriptionPh}
                                rows={4}
                                className={`${inputClass} resize-y`}
                            />

                        </div>

                        <div className="md:col-span-2">

                            <label
                                htmlFor="task-objective"
                                className={labelClass}
                            >

                                <Target
                                    className="h-4 w-4 text-cyan-400"
                                    aria-hidden="true"
                                />

                                {t.objective}

                            </label>

                            <textarea
                                id="task-objective"
                                value={objective}
                                onChange={(e) => setObjective(e.target.value)}
                                placeholder={t.objectivePh}
                                rows={3}
                                className={`${inputClass} resize-y`}
                            />

                        </div>

                        <div>

                            <label
                                htmlFor="task-time"
                                className={labelClass}
                            >
                                {t.estimatedTime}
                            </label>

                            <div className="relative">

                                <Clock
                                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                                    aria-hidden="true"
                                />

                                <input
                                    id="task-time"
                                    type="text"
                                    value={estimatedTime}
                                    onChange={(e) =>
                                        setEstimatedTime(e.target.value)
                                    }
                                    placeholder={t.estimatedTimePh}
                                    className={`${inputClass} pl-11`}
                                />

                            </div>

                        </div>

                        <div>

                            <label
                                htmlFor="task-difficulty"
                                className={labelClass}
                            >
                                {t.difficulty}
                            </label>

                            <div className="relative">

                                <Gauge
                                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                                    aria-hidden="true"
                                />

                                <select
                                    id="task-difficulty"
                                    value={difficulty}
                                    onChange={(e) =>
                                        setDifficulty(e.target.value)
                                    }
                                    className={`${inputClass} cursor-pointer appearance-none pl-11 pr-10`}
                                >

                                    {DIFFICULTIES.map((level) => (

                                        <option
                                            key={level}
                                            value={level}
                                            className="bg-[#0e1118] text-white"
                                        >
                                            {level}
                                        </option>

                                    ))}

                                </select>

                                <ChevronDown
                                    className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                                    aria-hidden="true"
                                />

                            </div>

                        </div>

                    </div>

                </section>

                <section className="rounded-3xl border border-white/[0.08] bg-[#0e1118] p-5 sm:p-8">

                    <h2 className="flex items-center gap-2 text-lg font-semibold text-white">

            <span
                className="h-2 w-2 rounded-full bg-purple-400"
                aria-hidden="true"
            />

                        {t.sectionSkills}

                    </h2>

                    <p className="mb-5 mt-1 text-sm text-slate-400">
                        {t.skillsHint}
                    </p>

                    <div className="flex flex-col gap-3 sm:flex-row">

                        <label
                            htmlFor="task-skill"
                            className="sr-only"
                        >
                            {t.sectionSkills}
                        </label>

                        <input
                            id="task-skill"
                            type="text"
                            value={skillInput}
                            onChange={(e) => setSkillInput(e.target.value)}
                            onKeyDown={handleSkillKeyDown}
                            placeholder={t.skillPh}
                            className={inputClass}
                        />

                        <button
                            type="button"
                            onClick={addSkill}
                            disabled={skillInput.trim() === ''}
                            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-purple-400/30 bg-purple-400/10 px-5 py-3 text-sm font-medium text-purple-300 transition hover:bg-purple-400/20 disabled:cursor-not-allowed disabled:opacity-40"
                        >

                            <Plus
                                className="h-4 w-4"
                                aria-hidden="true"
                            />

                            {t.add}

                        </button>

                    </div>

                    <div
                        className="mt-4 flex min-h-[2.5rem] flex-wrap gap-2"
                        aria-live="polite"
                    >

                        {skills.length === 0 ? (

                            <span className="self-center text-sm text-slate-500">
                {t.noSkills}
              </span>

                        ) : (

                            skills.map((skill) => (

                                <span
                                    key={skill}
                                    className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.08] py-1.5 pl-3.5 pr-1.5 text-sm text-cyan-300"
                                >

                  {skill}

                                    <button
                                        type="button"
                                        onClick={() => removeSkill(skill)}
                                        aria-label={`${t.remove} ${skill}`}
                                        className="rounded-full p-1 text-cyan-300/70 transition hover:bg-cyan-400/15 hover:text-white"
                                    >

                    <X
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                    />

                  </button>

                </span>

                            ))

                        )}

                    </div>

                </section>

                <section className="rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-5 sm:p-6">

                    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-emerald-400">

                        <ShieldCheck
                            className="h-4 w-4"
                            aria-hidden="true"
                        />

                        {t.evidenceTitle}

                    </h2>

                    <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center">

                        {t.evidenceSteps.map((step, index) => {
                            const isLast =
                                index === t.evidenceSteps.length - 1;

                            return (
                                <li
                                    key={step}
                                    className="flex items-center gap-2"
                                >

                  <span
                      className={`rounded-lg border px-3 py-1.5 text-sm ${
                          isLast
                              ? 'border-emerald-400/40 bg-emerald-400/10 font-semibold text-emerald-300'
                              : 'border-white/[0.08] bg-white/[0.03] text-slate-300'
                      }`}
                  >
                    {step}
                  </span>

                                    {!isLast && (

                                        <ArrowRight
                                            className="h-4 w-4 rotate-90 text-slate-500 md:rotate-0"
                                            aria-hidden="true"
                                        />

                                    )}

                                </li>
                            );
                        })}

                    </ol>

                </section>

                <div className="flex flex-col-reverse gap-3 border-t border-white/[0.08] pt-6 sm:flex-row sm:justify-end">

                    <button
                        type="button"
                        onClick={onCancel}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.02] px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-white/20 hover:text-white"
                    >
                        {t.cancel}
                    </button>

                    <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#0e1118] transition hover:bg-cyan-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e1118]"
                    >

                        {t.create}

                        <ArrowRight
                            className="h-4 w-4"
                            aria-hidden="true"
                        />

                    </button>

                </div>

            </form>

        </div>
    );
};

export default CreateTask;