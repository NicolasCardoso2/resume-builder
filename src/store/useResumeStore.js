import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { temporal } from 'zundo'
import { generateId } from '../utils/generateId'

const defaultPersonal = {
  name: '',
  title: '',
  email: '',
  phone: '',
  location: '',
  linkedin: '',
  github: '',
  website: '',
  summary: '',
  photo: '',
}

function makeResume(name = 'Meu Currículo') {
  return {
    id: generateId(),
    name,
    personal: { ...defaultPersonal },
    experiences: [],
    educations: [],
    skills: [],
    skillsMode: 'flat',
    projects: [],
    languages: [],
    certifications: [],
    template: 'modern',
    accentColor: '#2563eb',
  }
}

function upd(resumes, activeId, patch) {
  return resumes.map((r) => r.id === activeId ? { ...r, ...patch } : r)
}

export const selectActive = (s) =>
  s.resumes.find((r) => r.id === s.activeId) ?? s.resumes[0]

function debounce(fn, ms) {
  let timer
  return (state) => { clearTimeout(timer); timer = setTimeout(() => fn(state), ms) }
}

const _first = makeResume('Meu Currículo')

const useResumeStore = create(
  temporal(
    persist(
      (set) => ({
        resumes: [_first],
        activeId: _first.id,

        // ── Resume management ──────────────────────────────────
        createResume: (name = 'Novo Currículo') => {
          const r = makeResume(name)
          set((s) => ({ resumes: [...s.resumes, r], activeId: r.id }))
          return r.id
        },
        duplicateResume: (id) => set((s) => {
          const src = s.resumes.find((r) => r.id === id)
          if (!src) return {}
          const copy = { ...JSON.parse(JSON.stringify(src)), id: generateId(), name: `${src.name} (cópia)` }
          return { resumes: [...s.resumes, copy], activeId: copy.id }
        }),
        deleteResume: (id) => set((s) => {
          const filtered = s.resumes.filter((r) => r.id !== id)
          if (filtered.length === 0) {
            const r = makeResume('Meu Currículo')
            return { resumes: [r], activeId: r.id }
          }
          const activeId = s.activeId === id ? filtered[filtered.length - 1].id : s.activeId
          return { resumes: filtered, activeId }
        }),
        switchResume: (id) => set({ activeId: id }),
        renameResume: (id, name) => set((s) => ({ resumes: upd(s.resumes, id, { name }) })),

        // ── personal ──────────────────────────────────────────
        setPersonal: (data) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { personal: { ...selectActive(s).personal, ...data } }),
        })),

        // ── experience ────────────────────────────────────────
        addExperience: () => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            experiences: [...selectActive(s).experiences, {
              id: generateId(), company: '', role: '', startDate: '', endDate: '', current: false, description: '',
            }],
          }),
        })),
        updateExperience: (id, data) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            experiences: selectActive(s).experiences.map((e) => e.id === id ? { ...e, ...data } : e),
          }),
        })),
        removeExperience: (id) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            experiences: selectActive(s).experiences.filter((e) => e.id !== id),
          }),
        })),
        duplicateExperience: (id) => set((s) => {
          const exps = selectActive(s).experiences
          const idx = exps.findIndex((e) => e.id === id)
          if (idx === -1) return {}
          const copy = { ...exps[idx], id: generateId() }
          const next = [...exps]; next.splice(idx + 1, 0, copy)
          return { resumes: upd(s.resumes, s.activeId, { experiences: next }) }
        }),
        reorderExperiences: (ordered) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { experiences: ordered }),
        })),

        // ── education ─────────────────────────────────────────
        addEducation: () => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            educations: [...selectActive(s).educations, {
              id: generateId(), institution: '', degree: '', field: '', startDate: '', endDate: '', current: false, description: '',
            }],
          }),
        })),
        updateEducation: (id, data) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            educations: selectActive(s).educations.map((e) => e.id === id ? { ...e, ...data } : e),
          }),
        })),
        removeEducation: (id) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            educations: selectActive(s).educations.filter((e) => e.id !== id),
          }),
        })),
        duplicateEducation: (id) => set((s) => {
          const edus = selectActive(s).educations
          const idx = edus.findIndex((e) => e.id === id)
          if (idx === -1) return {}
          const copy = { ...edus[idx], id: generateId() }
          const next = [...edus]; next.splice(idx + 1, 0, copy)
          return { resumes: upd(s.resumes, s.activeId, { educations: next }) }
        }),
        reorderEducations: (ordered) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { educations: ordered }),
        })),

        // ── skills ────────────────────────────────────────────
        addSkill: () => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            skills: [...selectActive(s).skills, { id: generateId(), name: '', category: '' }],
          }),
        })),
        updateSkill: (id, data) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            skills: selectActive(s).skills.map((sk) => sk.id === id ? { ...sk, ...data } : sk),
          }),
        })),
        removeSkill: (id) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            skills: selectActive(s).skills.filter((sk) => sk.id !== id),
          }),
        })),
        reorderSkills: (ordered) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { skills: ordered }),
        })),
        setSkillsMode: (mode) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { skillsMode: mode }),
        })),

        // ── projects ──────────────────────────────────────────
        addProject: () => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            projects: [...selectActive(s).projects, {
              id: generateId(), name: '', description: '', url: '', technologies: '',
            }],
          }),
        })),
        updateProject: (id, data) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            projects: selectActive(s).projects.map((p) => p.id === id ? { ...p, ...data } : p),
          }),
        })),
        removeProject: (id) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            projects: selectActive(s).projects.filter((p) => p.id !== id),
          }),
        })),
        reorderProjects: (ordered) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { projects: ordered }),
        })),

        // ── languages ─────────────────────────────────────────
        addLanguage: () => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            languages: [...selectActive(s).languages, { id: generateId(), name: '', level: 'Intermediario' }],
          }),
        })),
        updateLanguage: (id, data) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            languages: selectActive(s).languages.map((l) => l.id === id ? { ...l, ...data } : l),
          }),
        })),
        removeLanguage: (id) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            languages: selectActive(s).languages.filter((l) => l.id !== id),
          }),
        })),
        reorderLanguages: (ordered) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { languages: ordered }),
        })),

        // ── certifications ────────────────────────────────────
        addCertification: () => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            certifications: [...selectActive(s).certifications, { id: generateId(), name: '', issuer: '', date: '' }],
          }),
        })),
        updateCertification: (id, data) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            certifications: selectActive(s).certifications.map((c) => c.id === id ? { ...c, ...data } : c),
          }),
        })),
        removeCertification: (id) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            certifications: selectActive(s).certifications.filter((c) => c.id !== id),
          }),
        })),
        reorderCertifications: (ordered) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { certifications: ordered }),
        })),

        // ── template / theme ──────────────────────────────────
        setTemplate: (name) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { template: name }),
        })),
        setAccentColor: (color) => set((s) => ({
          resumes: upd(s.resumes, s.activeId, { accentColor: color }),
        })),

        // ── reset ─────────────────────────────────────────────
        resetResume: () => set((s) => ({
          resumes: upd(s.resumes, s.activeId, {
            personal: { ...defaultPersonal },
            experiences: [], educations: [], skills: [], projects: [], languages: [], certifications: [],
            template: 'modern',
            accentColor: '#2563eb',
          }),
        })),
      }),
      {
        name: 'resume-builder-storage',
        version: 2,
        migrate: (old, version) => {
          if (version < 2 && old.personal !== undefined) {
            const id = generateId()
            return {
              resumes: [{
                id,
                name: old.personal?.name || 'Meu Currículo',
                personal: old.personal ?? { ...defaultPersonal },
                experiences: old.experiences ?? [],
                educations: old.educations ?? [],
                skills: old.skills ?? [],
                projects: old.projects ?? [],
                languages: old.languages ?? [],
                certifications: old.certifications ?? [],
                template: old.template ?? 'modern',
                accentColor: old.accentColor ?? '#2563eb',
              }],
              activeId: id,
            }
          }
          return old
        },
      }
    ),
    {
      partialize: (s) => ({ resumes: s.resumes, activeId: s.activeId }),
      limit: 50,
      handleSet: (handleSet) => debounce(handleSet, 600),
    }
  )
)

export default useResumeStore
