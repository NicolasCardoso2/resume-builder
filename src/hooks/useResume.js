import useResumeStore, { selectActive } from '../store/useResumeStore'

export function useResume() {
  const personal = useResumeStore((s) => selectActive(s).personal)
  const experiences = useResumeStore((s) => selectActive(s).experiences)
  const educations = useResumeStore((s) => selectActive(s).educations)
  const skills = useResumeStore((s) => selectActive(s).skills)
  const skillsMode = useResumeStore((s) => selectActive(s).skillsMode ?? 'flat')
  const projects = useResumeStore((s) => selectActive(s).projects)
  const languages = useResumeStore((s) => selectActive(s).languages)
  const certifications = useResumeStore((s) => selectActive(s).certifications)
  const template = useResumeStore((s) => selectActive(s).template)
  const accentColor = useResumeStore((s) => selectActive(s).accentColor)

  return { personal, experiences, educations, skills, skillsMode, projects, languages, certifications, template, accentColor }
}
