import { formatDate } from '../../utils/formatDate'

export default function ResumeExperience({ experiences }) {
  if (!experiences?.length) return null
  return (
    <div className="space-y-3">
      {experiences.map((exp) => (
        <div key={exp.id}>
          <div className="flex justify-between items-baseline">
            <p className="text-sm font-semibold text-gray-800">{exp.role}</p>
            <span className="text-xs text-gray-500 shrink-0 ml-2">
              {formatDate(exp.startDate)} – {exp.current ? 'Atual' : formatDate(exp.endDate)}
            </span>
          </div>
          <p className="text-xs text-gray-600 font-medium">{exp.company}</p>
          {exp.description && (
            <p className="text-xs text-gray-700 mt-1 leading-relaxed whitespace-pre-line">
              {exp.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
