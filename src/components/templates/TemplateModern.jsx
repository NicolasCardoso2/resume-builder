import { formatDate } from '../../utils/formatDate'

/* ── helpers ─────────────────────────────────────────── */
function shortUrl(url = '') {
  try {
    const u = new URL(url.startsWith('http') ? url : `https://${url}`)
    return u.hostname.replace('www.', '') + (u.pathname !== '/' ? u.pathname : '')
  } catch {
    return url
  }
}

function labelFor(url = '') {
  const lower = url.toLowerCase()
  if (lower.includes('linkedin')) return 'LinkedIn'
  if (lower.includes('github')) return 'GitHub'
  return shortUrl(url)
}

/* ── small SVG icons ─────────────────────────────────── */
const IcoEmail = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>
  </svg>
)
const IcoPhone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
)
const IcoPin = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)
const IcoLink = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
)
const IcoArrow = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M7 7h10v10"/>
  </svg>
)
const IcoCal = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
  </svg>
)

/* ── Section headings ────────────────────────────────── */
function MainSection({ title, accent, children }) {
  return (
    <section style={{ marginBottom: '22px', breakInside: 'avoid' }}>
      <div style={{ marginBottom: '12px' }}>
        <span style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>
          {title}
        </span>
      </div>
      {children}
    </section>
  )
}

function SideSection({ title, accent, children }) {
  return (
    <div style={{ marginBottom: '22px', breakInside: 'avoid' }}>
      <p style={{ fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: accent, marginBottom: '10px', paddingBottom: '5px', borderBottom: `1px solid ${accent}30` }}>
        {title}
      </p>
      {children}
    </div>
  )
}

/* ── Main component ──────────────────────────────────── */
export default function TemplateModern({
  personal,
  experiences,
  educations,
  skills,
  skillsMode,
  projects,
  languages,
  certifications,
  accentColor,
}) {
  const acc = accentColor || '#2563eb'
  const { name, title, email, phone, location, linkedin, github, website, photo, summary } = personal
  const isGrouped = skillsMode === 'grouped'

  // Build grouped skills map preserving insertion order of categories
  const skillGroups = isGrouped
    ? (() => {
        const map = new Map()
        skills?.filter(s => s.name?.trim()).forEach((sk) => {
          const cat = sk.category?.trim() || 'Outros'
          if (!map.has(cat)) map.set(cat, [])
          map.get(cat).push(sk)
        })
        return map
      })()
    : null

  return (
    <div style={{ fontFamily: "'Inter', 'Roboto', 'Open Sans', sans-serif", display: 'flex', background: '#fff', fontSize: '13px', color: '#1a1a2e' }}>

      {/* ── LEFT SIDEBAR ── */}
      <aside style={{ width: '33%', background: acc + '08', borderRight: `1px solid ${acc}20`, padding: '32px 20px 32px 22px', display: 'flex', flexDirection: 'column', gap: 0, WebkitPrintColorAdjust: 'exact', printColorAdjust: 'exact' }}>

        {/* Photo */}
        {photo && (
          <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center' }}>
            <img src={photo} alt={name} style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${acc}50` }} />
          </div>
        )}

        {/* Contact */}
        <SideSection title="Contato" accent={acc}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {email && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#374151', fontSize: '11.5px', wordBreak: 'break-all' }}>
                <span style={{ color: acc, flexShrink: 0 }}><IcoEmail /></span> {email}
              </div>
            )}
            {phone && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#374151', fontSize: '11.5px' }}>
                <span style={{ color: acc, flexShrink: 0 }}><IcoPhone /></span> {phone}
              </div>
            )}
            {location && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: '#374151', fontSize: '11.5px' }}>
                <span style={{ color: acc, flexShrink: 0 }}><IcoPin /></span> {location}
              </div>
            )}
            {linkedin && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11.5px' }}>
                <span style={{ color: acc, flexShrink: 0 }}><IcoLink /></span>
                <a href={linkedin.startsWith('http') ? linkedin : `https://${linkedin}`} target="_blank" rel="noreferrer" style={{ color: acc, textDecoration: 'none', fontWeight: 500 }}>
                  LinkedIn
                </a>
              </div>
            )}
            {github && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11.5px' }}>
                <span style={{ color: acc, flexShrink: 0 }}><IcoLink /></span>
                <a href={github.startsWith('http') ? github : `https://${github}`} target="_blank" rel="noreferrer" style={{ color: acc, textDecoration: 'none', fontWeight: 500 }}>
                  GitHub
                </a>
              </div>
            )}
            {website && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '11.5px' }}>
                <span style={{ color: acc, flexShrink: 0 }}><IcoLink /></span>
                <a href={website.startsWith('http') ? website : `https://${website}`} target="_blank" rel="noreferrer" style={{ color: acc, textDecoration: 'none', fontWeight: 500 }}>
                  Portfólio
                </a>
              </div>
            )}
          </div>
        </SideSection>

        {/* Skills */}
        {skills?.filter(s => s.name?.trim()).length > 0 && (
          <SideSection title="Habilidades" accent={acc}>
            {isGrouped ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {Array.from(skillGroups.entries()).map(([cat, items]) => (
                  <div key={cat}>
                    <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: acc, marginBottom: '6px' }}>{cat}</p>
                    <p style={{ fontSize: '11.5px', color: '#374151', lineHeight: 1.7 }}>
                      {items.map(sk => sk.name).join(', ')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                {skills.filter(s => s.name?.trim()).map((sk) => (
                  <div key={sk.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '7px', marginBottom: '7px', borderBottom: `1px solid ${acc}18` }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '2px', background: acc, flexShrink: 0 }} />
                    <span style={{ fontSize: '11.5px', fontWeight: 500, color: '#1f2937' }}>{sk.name}</span>
                  </div>
                ))}
              </div>
            )}
          </SideSection>
        )}

        {/* Languages */}
        {languages?.length > 0 && (
          <SideSection title="Idiomas" accent={acc}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
              {languages.map((l) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937' }}>{l.name}</span>
                  {l.level && <span style={{ fontSize: '11px', color: '#6b7280' }}>{l.level}</span>}
                </div>
              ))}
            </div>
          </SideSection>
        )}

      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex: 1, padding: '32px 28px 32px 26px' }}>

        {/* Name & Title */}
        <header style={{ marginBottom: '18px', paddingBottom: '14px', borderBottom: `2px solid ${acc}` }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1.1, margin: 0 }}>
            {name || 'Seu Nome'}
          </h1>
          {title && (
            <p style={{ fontSize: '13px', fontWeight: 500, color: acc, marginTop: '5px', letterSpacing: '0.01em' }}>
              {title}
            </p>
          )}
        </header>

        {/* Summary */}
        {summary && (
          <MainSection title="Sobre mim" accent={acc}>
            <p style={{ fontSize: '12.5px', lineHeight: 1.7, color: '#374151' }}>{summary}</p>
          </MainSection>
        )}

        {/* Experience */}
        {experiences?.length > 0 && (
          <MainSection title="Experiência Profissional" accent={acc}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {experiences.map((exp) => (
                <div key={exp.id} style={{ breakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{exp.role}</p>
                    <span style={{ fontSize: '10.5px', color: '#9ca3af', flexShrink: 0, fontWeight: 500 }}>
                      {formatDate(exp.startDate)} – {exp.current ? 'Atual' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: acc, marginTop: '2px' }}>{exp.company}</p>
                  {exp.description && (
                    <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '5px', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* Education */}
        {educations?.length > 0 && (
          <MainSection title="Formação Acadêmica" accent={acc}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {educations.map((edu) => (
                <div key={edu.id} style={{ breakInside: 'avoid' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                      {edu.degree}{edu.field ? ` em ${edu.field}` : ''}
                    </p>
                    <span style={{ fontSize: '10.5px', color: '#9ca3af', flexShrink: 0, fontWeight: 500 }}>
                      {formatDate(edu.startDate)} – {edu.current ? 'Atual' : formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: 600, color: acc, marginTop: '2px' }}>{edu.institution}</p>
                  {edu.description && (
                    <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '4px', lineHeight: 1.65 }}>{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* Projects */}
        {projects?.length > 0 && (
          <MainSection title="Projetos" accent={acc}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {projects.map((p) => (
                <div key={p.id} style={{ breakInside: 'avoid' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', margin: 0 }}>{p.name}</p>
                    {p.url && (
                      <a
                        href={p.url.startsWith('http') ? p.url : `https://${p.url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', fontSize: '11px', color: acc, fontWeight: 500, textDecoration: 'none' }}
                      >
                        <IcoArrow /> Ver projeto
                      </a>
                    )}
                  </div>
                  {p.technologies && (
                    <p style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'monospace', marginTop: '3px' }}>{p.technologies}</p>
                  )}
                  {p.description && (
                    <p style={{ fontSize: '12px', color: '#4b5563', marginTop: '5px', lineHeight: 1.65, whiteSpace: 'pre-line' }}>
                      {p.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </MainSection>
        )}

        {/* Certifications */}
        {certifications?.length > 0 && (
          <MainSection title="Certificações" accent={acc}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              {certifications.map((c) => (
                <div key={c.id} style={{ flex: '1 1 45%', minWidth: '160px', paddingLeft: '12px', borderLeft: `3px solid ${acc}`, paddingTop: '4px', paddingBottom: '4px', breakInside: 'avoid' }}>
                  <p style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a', lineHeight: 1.3, margin: 0 }}>{c.name}</p>
                  {c.issuer && <p style={{ fontSize: '11px', color: acc, fontWeight: 500, marginTop: '3px' }}>{c.issuer}</p>}
                  {c.date && <p style={{ fontSize: '10.5px', color: '#9ca3af', marginTop: '2px' }}>{formatDate(c.date)}</p>}
                </div>
              ))}
            </div>
          </MainSection>
        )}
      </main>
    </div>
  )
}

