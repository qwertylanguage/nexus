import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { Briefcase, Building2, Clock, MapPin, Plus, X, AlertCircle, ArrowRight } from 'lucide-react';

interface CreateInternshipProps {
    onCancel: () => void;
    onCreated: (internship: {
        title: string;
        company: string;
        description: string;
        location: string;
        duration: string;
        skills: string[];
    }) => void;
    lang: 'ru' | 'en';
}

const TEXT = {
    en: {
        workspace: 'Company Workspace',
        heading: 'Create Internship',
        subheading: 'Describe the internship and the skills your practical tasks will verify.',
        sectionBasics: 'Basics',
        sectionSkills: 'Skills',
        skillsHint: 'Skills students will demonstrate through practical tasks.',
        title: 'Internship title',
        titlePh: 'Backend Engineering Internship',
        titleRequired: 'Internship title is required',
        company: 'Company',
        companyPh: 'Nexus Labs',
        description: 'Description',
        descriptionPh: 'What will the intern work on? Which systems, which problems?',
        location: 'Location',
        locationPh: 'Remote',
        duration: 'Duration',
        durationPh: '8 weeks',
        skillPh: 'Go',
        add: 'Add',
        remove: 'Remove',
        noSkills: 'No skills added yet',
        cancel: 'Cancel',
        create: 'Create Internship',
        required: 'required',
    },
    ru: {
        workspace: 'Кабинет компании',
        heading: 'Создание стажировки',
        subheading: 'Опишите стажировку и навыки, которые будут подтверждать практические задания.',
        sectionBasics: 'Основное',
        sectionSkills: 'Навыки',
        skillsHint: 'Навыки, которые студент продемонстрирует в практических заданиях.',
        title: 'Название стажировки',
        titlePh: 'Backend Engineering Internship',
        titleRequired: 'Укажите название стажировки',
        company: 'Компания',
        companyPh: 'Nexus Labs',
        description: 'Описание',
        descriptionPh: 'Над чем будет работать стажёр? Какие системы, какие задачи?',
        location: 'Локация',
        locationPh: 'Удалённо',
        duration: 'Длительность',
        durationPh: '8 недель',
        skillPh: 'Go',
        add: 'Добавить',
        remove: 'Удалить',
        noSkills: 'Навыки пока не добавлены',
        cancel: 'Отмена',
        create: 'Создать стажировку',
        required: 'обязательно',
    },
} as const;

const inputClass =
    'w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20';

const labelClass = 'mb-2 block text-sm font-medium text-slate-300';

export const CreateInternship = ({ onCancel, onCreated, lang }: CreateInternshipProps) => {
    const t = TEXT[lang];

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [duration, setDuration] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');
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
            company: company.trim(),
            description: description.trim(),
            location: location.trim(),
            duration: duration.trim(),
            skills,
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

            <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-6"
            >

                <section className="rounded-3xl border border-white/[0.08] bg-[#0e1118] p-5 sm:p-8">

                    <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">

                        <Briefcase
                            className="h-5 w-5 text-cyan-400"
                            aria-hidden="true"
                        />

                        {t.sectionBasics}

                    </h2>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                        <div className="md:col-span-2">

                            <label
                                htmlFor="internship-title"
                                className={labelClass}
                            >
                                {t.title}

                                <span className="text-xs font-normal text-slate-500">
                  {' '}· {t.required}
                </span>

                            </label>

                            <input
                                id="internship-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={t.titlePh}
                                aria-invalid={titleError}
                                aria-describedby={
                                    titleError
                                        ? 'internship-title-error'
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
                                    id="internship-title-error"
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
                                htmlFor="internship-company"
                                className={labelClass}
                            >
                                {t.company}
                            </label>

                            <input
                                id="internship-company"
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder={t.companyPh}
                                className={inputClass}
                            />

                        </div>

                        <div className="md:col-span-2">

                            <label
                                htmlFor="internship-description"
                                className={labelClass}
                            >
                                {t.description}
                            </label>

                            <textarea
                                id="internship-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder={t.descriptionPh}
                                rows={4}
                                className={`${inputClass} resize-y`}
                            />

                        </div>

                        <div>

                            <label
                                htmlFor="internship-location"
                                className={labelClass}
                            >
                                {t.location}
                            </label>

                            <div className="relative">

                                <MapPin
                                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                                    aria-hidden="true"
                                />

                                <input
                                    id="internship-location"
                                    type="text"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder={t.locationPh}
                                    className={`${inputClass} pl-11`}
                                />

                            </div>

                        </div>

                        <div>

                            <label
                                htmlFor="internship-duration"
                                className={labelClass}
                            >
                                {t.duration}
                            </label>

                            <div className="relative">

                                <Clock
                                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                                    aria-hidden="true"
                                />

                                <input
                                    id="internship-duration"
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder={t.durationPh}
                                    className={`${inputClass} pl-11`}
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
                            htmlFor="internship-skill"
                            className="sr-only"
                        >
                            {t.sectionSkills}
                        </label>

                        <input
                            id="internship-skill"
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

export default CreateInternship;