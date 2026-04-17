export default function ResumeSection({ title, children, accentColor }) {
  if (!children) return null
  return (
    <section className="mb-5">
      <h2
        className="text-xs font-bold uppercase tracking-widest mb-2 pb-1 border-b-2"
        style={{ color: accentColor, borderColor: accentColor }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}
