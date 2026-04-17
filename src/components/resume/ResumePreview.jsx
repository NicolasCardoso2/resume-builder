import { forwardRef, useState, useEffect } from 'react'
import { useResume } from '../../hooks/useResume'
import TemplateModern from '../templates/TemplateModern'
import TemplateClassic from '../templates/TemplateClassic'
import TemplateMinimal from '../templates/TemplateMinimal'

const TEMPLATES = {
  modern: TemplateModern,
  classic: TemplateClassic,
  minimal: TemplateMinimal,
}

const ResumePreview = forwardRef(function ResumePreview(_, ref) {
  const resume = useResume()
  const Template = TEMPLATES[resume.template] ?? TemplateModern
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 120)
    return () => clearTimeout(t)
  }, [resume.template])

  const isModern = resume.template === 'modern' || !resume.template

  return (
    <div
      ref={ref}
      id="resume-print-root"
      className={`bg-white shadow-lg resume-page text-gray-900 transition-opacity duration-150 ${isModern ? '' : 'p-10'} overflow-hidden`}
      style={{ opacity: visible ? 1 : 0 }}
    >
      <Template {...resume} />
    </div>
  )
})

export default ResumePreview
