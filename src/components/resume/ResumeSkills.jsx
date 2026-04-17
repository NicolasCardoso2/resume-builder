export default function ResumeSkills({ skills, accentColor }) {
  const filtered = skills?.filter((sk) => sk.name?.trim())
  if (!filtered?.length) return null

  return (
    <div className="flex flex-wrap gap-2">
      {filtered.map((sk) => (
        <div
          key={sk.id}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border"
          style={{
            borderColor: accentColor,
            color: accentColor,
            backgroundColor: `${accentColor}18`,
          }}
        >
          <span>{sk.name}</span>
        </div>
      ))}
    </div>
  )
}
