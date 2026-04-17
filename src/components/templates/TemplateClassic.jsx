import ResumeExperience from '../resume/ResumeExperience'
import ResumeEducation from '../resume/ResumeEducation'
import ResumeProjects from '../resume/ResumeProjects'
import ResumeLanguages from '../resume/ResumeLanguages'
import ResumeCertifications from '../resume/ResumeCertifications'

function ClassicSection({ title, accentColor, children }) {
  if (!children) return null
  return (
    <section className="mb-5">
      <h2
        className="text-[10px] font-bold uppercase tracking-[0.2em] m-0 p-0 mb-2"
        style={{ color: accentColor }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

export default function TemplateClassic({
  personal,
  experiences,
  educations,
  skills,
  projects,
  languages,
  certifications,
  accentColor,
}) {
  const { name, title, email, phone, location, linkedin, github, website, summary } = personal

  const filteredSkills = skills?.filter((sk) => sk.name?.trim()) ?? []

  return (
    <div className="font-sans text-gray-800">
      {/* Header — two column */}
      <header className="flex justify-between items-start mb-6 pb-4 border-b-2" style={{ borderColor: accentColor }}>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {name || 'Seu Nome'}
          </h1>
          {title && (
            <p className="text-xs font-semibold mt-0.5 uppercase tracking-widest" style={{ color: accentColor }}>
              {title}
            </p>
          )}
        </div>
        <div className="text-right text-[10px] text-gray-500 space-y-0.5 mt-0.5">
          {email && <p>{email}</p>}
          {phone && <p>{phone}</p>}
          {location && <p>{location}</p>}
          {linkedin && <p><a href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>{linkedin}</a></p>}
          {github && <p><a href={github.startsWith('http') ? github : `https://${github}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>{github}</a></p>}
          {website && <p><a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noopener noreferrer" style={{ color: accentColor }}>{website}</a></p>}
        </div>
      </header>

      {summary && (
        <ClassicSection title="Perfil" accentColor={accentColor}>
          <p className="text-xs text-gray-700 leading-relaxed text-justify">{summary}</p>
        </ClassicSection>
      )}

      {experiences?.length > 0 && (
        <ClassicSection title="Experiência Profissional" accentColor={accentColor}>
          <ResumeExperience experiences={experiences} />
        </ClassicSection>
      )}

      {educations?.length > 0 && (
        <ClassicSection title="Educação" accentColor={accentColor}>
          <ResumeEducation educations={educations} />
        </ClassicSection>
      )}

      {filteredSkills.length > 0 && (
        <ClassicSection title="Competências" accentColor={accentColor}>
          <p className="text-xs text-gray-700 leading-relaxed">
            {filteredSkills.map((sk, i) => (
              <span key={sk.id}>
                {sk.name}
                {i < filteredSkills.length - 1 && (
                  <span className="mx-1.5 font-light text-gray-400">|</span>
                )}
              </span>
            ))}
          </p>
        </ClassicSection>
      )}

      {projects?.length > 0 && (
        <ClassicSection title="Projetos" accentColor={accentColor}>
          <ResumeProjects projects={projects} accentColor={accentColor} />
        </ClassicSection>
      )}

      {languages?.length > 0 && (
        <ClassicSection title="Idiomas" accentColor={accentColor}>
          <ResumeLanguages languages={languages} />
        </ClassicSection>
      )}

      {certifications?.length > 0 && (
        <ClassicSection title="Certificações" accentColor={accentColor}>
          <ResumeCertifications certifications={certifications} />
        </ClassicSection>
      )}
    </div>
  )
}
