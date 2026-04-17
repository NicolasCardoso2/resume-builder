import ResumeExperience from '../resume/ResumeExperience'
import ResumeEducation from '../resume/ResumeEducation'
import ResumeProjects from '../resume/ResumeProjects'
import ResumeLanguages from '../resume/ResumeLanguages'
import ResumeCertifications from '../resume/ResumeCertifications'

function MinimalSection({ title, children }) {
  if (!children) return null
  return (
    <section className="mb-4">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function TemplateMinimal({
  personal,
  experiences,
  educations,
  skills,
  projects,
  languages,
  certifications,
  accentColor,
}) {
  const { name, title, email, phone, location, summary } = personal

  return (
    <div className="font-sans text-gray-800">
      {/* Minimal header */}
      <header className="mb-7">
        <h1 className="text-xl font-bold tracking-tight">{name || 'Seu Nome'}</h1>
        {title && <p className="text-xs mt-0.5 text-gray-500">{title}</p>}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-[11px] text-gray-500">
          {email && <span>{email}</span>}
          {phone && <span>{phone}</span>}
          {location && <span>{location}</span>}
        </div>
      </header>

      {summary && (
        <MinimalSection title="Sobre">
          <p className="text-xs text-gray-700 leading-relaxed">{summary}</p>
        </MinimalSection>
      )}

      {experiences?.length > 0 && (
        <MinimalSection title="Experiência">
          <ResumeExperience experiences={experiences} />
        </MinimalSection>
      )}

      {educations?.length > 0 && (
        <MinimalSection title="Formação">
          <ResumeEducation educations={educations} />
        </MinimalSection>
      )}

      {skills?.length > 0 && (
        <MinimalSection title="Skills">
          <div className="flex flex-wrap gap-1.5">
            {skills.map((sk) => (
              <span
                key={sk.id}
                className="text-[11px] text-gray-700 after:content-['·'] after:ml-1.5 last:after:content-['']"
              >
                {sk.name}
              </span>
            ))}
          </div>
        </MinimalSection>
      )}

      {projects?.length > 0 && (
        <MinimalSection title="Projetos">
          <ResumeProjects projects={projects} accentColor={accentColor} />
        </MinimalSection>
      )}

      {languages?.length > 0 && (
        <MinimalSection title="Idiomas">
          <ResumeLanguages languages={languages} />
        </MinimalSection>
      )}

      {certifications?.length > 0 && (
        <MinimalSection title="Certificações">
          <ResumeCertifications certifications={certifications} />
        </MinimalSection>
      )}
    </div>
  )
}
