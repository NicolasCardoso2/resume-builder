export default function ResumeLanguages({ languages, accentColor }) {
  if (!languages?.length) return null

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1">
      {languages.map((l) => (
        <span key={l.id} className="text-xs text-gray-700">
          <span className="font-medium">{l.name}</span>
          {l.level && <span className="text-gray-400"> · {l.level}</span>}
        </span>
      ))}
    </div>
  )
}
