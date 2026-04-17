import { formatDate } from '../../utils/formatDate'

export default function ResumeCertifications({ certifications, accentColor }) {
  if (!certifications?.length) return null

  if (accentColor) {
    return (
      <div className="flex flex-wrap gap-2">
        {certifications.map((c) => (
          <div
            key={c.id}
            className="flex flex-col px-3 py-1.5 rounded-md"
            style={{ backgroundColor: accentColor + '12', border: `1px solid ${accentColor}40` }}
          >
            <span className="text-[11px] font-bold leading-tight" style={{ color: accentColor }}>
              {c.name}
            </span>
            {c.issuer && (
              <span className="text-[10px] text-gray-500 leading-tight mt-0.5">{c.issuer}</span>
            )}
            {c.date && (
              <span className="text-[10px] text-gray-400 mt-0.5">{formatDate(c.date)}</span>
            )}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-1.5">
      {certifications.map((c) => (
        <div key={c.id} className="flex items-baseline justify-between">
          <div>
            <span className="text-xs font-semibold text-gray-800">{c.name}</span>
            {c.issuer && (
              <span className="text-xs text-gray-500 ml-1.5">{c.issuer}</span>
            )}
          </div>
          {c.date && (
            <span className="text-[11px] text-gray-400 shrink-0 ml-2">
              {formatDate(c.date)}
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
