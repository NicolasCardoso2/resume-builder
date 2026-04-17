import { formatDate } from '../../utils/formatDate'

export default function ResumeEducation({ educations }) {
  if (!educations?.length) return null
  return (
    <div className="space-y-3">
      {educations.map((edu) => (
        <div key={edu.id}>
          <div className="flex justify-between items-baseline">
            <p className="text-sm font-semibold text-gray-800">
              {edu.degree}{edu.field ? ` em ${edu.field}` : ''}
            </p>
            <span className="text-xs text-gray-500 shrink-0 ml-2">
              {formatDate(edu.startDate)} – {edu.current ? 'Atual' : formatDate(edu.endDate)}
            </span>
          </div>
          <p className="text-xs text-gray-600 font-medium">{edu.institution}</p>
          {edu.description && (
            <p className="text-xs text-gray-700 mt-1 leading-relaxed">{edu.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
