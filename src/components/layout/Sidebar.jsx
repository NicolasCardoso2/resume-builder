import { useState } from 'react'
import PersonalDataForm from '../forms/PersonalDataForm'
import ExperienceForm from '../forms/ExperienceForm'
import EducationForm from '../forms/EducationForm'
import SkillsForm from '../forms/SkillsForm'
import ProjectsForm from '../forms/ProjectsForm'
import LanguagesForm from '../forms/LanguagesForm'
import CertificationsForm from '../forms/CertificationsForm'
import ColorPicker from '../ui/ColorPicker'
import useResumeStore, { selectActive } from '../../store/useResumeStore'

const ICONS = {
  personal: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <line x1="10" y1="14" x2="14" y2="14" />
    </svg>
  ),
  education: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M22 10L12 4 2 10l10 6 10-6z" />
      <path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5" />
    </svg>
  ),
  skills: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  projects: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  languages: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  certifications: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="8" r="6" />
      <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" />
    </svg>
  ),
}

const SECTIONS = [
  { id: 'personal',        label: 'Pessoal',      icon: ICONS.personal },
  { id: 'experience',      label: 'Experiência',  icon: ICONS.experience },
  { id: 'education',       label: 'Formação',     icon: ICONS.education },
  { id: 'skills',          label: 'Skills',       icon: ICONS.skills },
  { id: 'projects',        label: 'Projetos',     icon: ICONS.projects },
  { id: 'languages',       label: 'Idiomas',      icon: ICONS.languages },
  { id: 'certifications',  label: 'Certs',        icon: ICONS.certifications },
]

const FORM_MAP = {
  personal: PersonalDataForm,
  experience: ExperienceForm,
  education: EducationForm,
  skills: SkillsForm,
  projects: ProjectsForm,
  languages: LanguagesForm,
  certifications: CertificationsForm,
}

function CompletenessBar() {
  const personal = useResumeStore((s) => selectActive(s).personal)
  const experiences = useResumeStore((s) => selectActive(s).experiences)
  const educations = useResumeStore((s) => selectActive(s).educations)
  const skills = useResumeStore((s) => selectActive(s).skills)

  const checks = [
    personal.name,
    personal.email,
    personal.title,
    personal.summary,
    personal.phone,
    experiences.length > 0,
    educations.length > 0,
    skills.length > 0,
    personal.photo,
    personal.linkedin,
  ]
  const filled = checks.filter(Boolean).length
  const pct = Math.round((filled / checks.length) * 100)

  const [color, bg, label] =
    pct < 40  ? ['#ef4444', 'bg-red-50',    'Incompleto'] :
    pct < 75  ? ['#f59e0b', 'bg-amber-50',  'Em progresso'] :
                ['#22c55e', 'bg-green-50',  'Ótimo']

  return (
    <div className={`px-4 py-2.5 border-b border-gray-100 ${bg}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-medium text-gray-500 tracking-wide uppercase">Perfil</span>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: color }}>
          {pct}% — {label}
        </span>
      </div>
      <div className="h-1.5 bg-white rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

export default function Sidebar() {
  const [active, setActive] = useState('personal')
  const accentColor = useResumeStore((s) => selectActive(s).accentColor)
  const setAccentColor = useResumeStore((s) => s.setAccentColor)

  const ActiveComponent = FORM_MAP[active]

  return (
    <aside className="w-full lg:w-[380px] shrink-0 bg-white border-r border-gray-200 flex flex-col h-full overflow-hidden">
      {/* Completeness bar */}
      <CompletenessBar />

      {/* Tabs */}
      <nav className="flex overflow-x-auto border-b border-gray-100 shrink-0 bg-white px-1 pt-1 scrollbar-hide">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            onClick={() => setActive(s.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-2 text-[10px] font-medium rounded-t-lg transition-all whitespace-nowrap min-w-[52px] border-b-2
              ${active === s.id
                ? 'border-blue-600 text-blue-700 bg-blue-50'
                : 'border-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
          >
            <span className="leading-none">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </nav>

      {/* Form area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {ActiveComponent && <ActiveComponent />}

        {active === 'personal' && (
          <div className="pt-2 border-t border-gray-100">
            <ColorPicker
              label="Cor de destaque"
              value={accentColor}
              onChange={setAccentColor}
            />
          </div>
        )}
      </div>
    </aside>
  )
}
