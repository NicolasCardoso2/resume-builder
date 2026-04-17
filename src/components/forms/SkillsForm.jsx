import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import useResumeStore, { selectActive } from '../../store/useResumeStore'
import SortableItem from '../ui/SortableItem'
import Input from '../ui/Input'
import Button from '../ui/Button'

function SkillItem({ item, grouped }) {
  const updateSkill = useResumeStore((s) => s.updateSkill)
  const removeSkill = useResumeStore((s) => s.removeSkill)

  const { register, watch } = useForm({ defaultValues: item })

  useEffect(() => {
    const sub = watch((values) => updateSkill(item.id, values))
    return () => sub.unsubscribe()
  }, [watch, item.id, updateSkill])

  return (
    <SortableItem id={item.id}>
      {({ handleProps }) => (
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2.5">
          <button type="button" className="cursor-grab active:cursor-grabbing p-0.5 text-gray-300 hover:text-gray-500 touch-none" {...handleProps}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
              <circle cx="5" cy="4" r="1.2"/><circle cx="11" cy="4" r="1.2"/>
              <circle cx="5" cy="8" r="1.2"/><circle cx="11" cy="8" r="1.2"/>
              <circle cx="5" cy="12" r="1.2"/><circle cx="11" cy="12" r="1.2"/>
            </svg>
          </button>
          <div className={`flex gap-2 flex-1 ${grouped ? 'flex-col' : ''}`}>
            {grouped && (
              <Input {...register('category')} placeholder="Grupo (ex: Linguagens, Frameworks...)" />
            )}
            <Input {...register('name')} placeholder="Ex: React, Python, Figma..." />
          </div>
          <button type="button" onClick={() => removeSkill(item.id)} className="text-red-400 hover:text-red-600 text-lg leading-none">×</button>
        </div>
      )}
    </SortableItem>
  )
}

export default function SkillsForm() {
  const skills = useResumeStore((s) => selectActive(s).skills)
  const skillsMode = useResumeStore((s) => selectActive(s).skillsMode ?? 'flat')
  const addSkill = useResumeStore((s) => s.addSkill)
  const reorderSkills = useResumeStore((s) => s.reorderSkills)
  const setSkillsMode = useResumeStore((s) => s.setSkillsMode)

  const grouped = skillsMode === 'grouped'

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const oldIdx = skills.findIndex((s) => s.id === active.id)
    const newIdx = skills.findIndex((s) => s.id === over.id)
    reorderSkills(arrayMove(skills, oldIdx, newIdx))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Habilidades</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setSkillsMode('flat')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${!grouped ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Lista
            </button>
            <button
              type="button"
              onClick={() => setSkillsMode('grouped')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${grouped ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Grupos
            </button>
          </div>
          <Button size="sm" onClick={addSkill} type="button">+ Adicionar</Button>
        </div>
      </div>
      {grouped && (
        <p className="text-xs text-gray-400 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
          Preencha o <strong>Grupo</strong> igual para agrupar habilidades. Ex: todas com "Linguagens" ficam juntas.
        </p>
      )}
      {skills.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">Nenhuma habilidade adicionada.</p>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={skills.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {skills.map((item) => <SkillItem key={item.id} item={item} grouped={grouped} />)}
        </SortableContext>
      </DndContext>
    </div>
  )
}
