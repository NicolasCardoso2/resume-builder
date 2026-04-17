export default function ResumeProjects({ projects, accentColor }) {
  if (!projects?.length) return null
  return (
    <div className="space-y-3">
      {projects.map((p) => (
        <div key={p.id}>
          <div className="flex items-baseline gap-2">
            <p className="text-sm font-semibold text-gray-800">{p.name}</p>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline"
                style={{ color: accentColor }}
              >
                {p.url}
              </a>
            )}
          </div>
          {p.technologies && (
            <p className="text-xs font-medium text-gray-500 mt-0.5">{p.technologies}</p>
          )}
          {p.description && (
            <p className="text-xs text-gray-700 mt-1 leading-relaxed whitespace-pre-line">
              {p.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
