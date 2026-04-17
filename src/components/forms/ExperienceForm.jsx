import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import useResumeStore, { selectActive } from '../../store/useResumeStore'
import SortableItem from '../ui/SortableItem'
import Input from '../ui/Input'
import Button from '../ui/Button'

function DragHandle({ handleProps }) {
  return (
    <button
      type="button"
      className="cursor-grab active:cursor-grabbing p-1 text-gray-300 hover:text-gray-500 shrink-0 mt-0.5 touch-none"
      title="Arrastar para reordenar"
      {...handleProps}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <circle cx="5" cy="4" r="1.2"/><circle cx="11" cy="4" r="1.2"/>
        <circle cx="5" cy="8" r="1.2"/><circle cx="11" cy="8" r="1.2"/>
        <circle cx="5" cy="12" r="1.2"/><circle cx="11" cy="12" r="1.2"/>
      </svg>
    </button>
  )
}

function ExperienceItem({ item }) {
  const updateExperience = useResumeStore((s) => s.updateExperience)
  const removeExperience = useResumeStore((s) => s.removeExperience)
  const duplicateExperience = useResumeStore((s) => s.duplicateExperience)

  const { register, watch } = useForm({ defaultValues: item })

  useEffect(() => {
    const sub = watch((values) => updateExperience(item.id, values))
    return () => sub.unsubscribe()
  }, [watch, item.id, updateExperience])

  const isCurrent = watch('current')

  return (
    <SortableItem id={item.id}>
      {({ handleProps }) => (
        <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-white">
          <div className="flex items-start gap-1">
            <DragHandle handleProps={handleProps} />
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input label="Empresa" {...register('company')} placeholder="Empresa XPTO" />
                <Input label="Cargo" {...register('role')} placeholder="Desenvolvedor Frontend" />
                <Input label="Data início" type="month" {...register('startDate')} />
                {!isCurrent && (
                  <Input label="Data fim" type="month" {...register('endDate')} />
                )}
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="checkbox" {...register('current')} className="rounded" />
                Emprego atual
              </label>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Descrição</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="Descreva suas responsabilidades e conquistas..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" type="button" onClick={() => duplicateExperience(item.id)}>
                  Duplicar
                </Button>
                <Button variant="danger" size="sm" type="button" onClick={() => removeExperience(item.id)}>
                  Remover
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </SortableItem>
  )
}

export default function ExperienceForm() {
  const experiences = useResumeStore((s) => selectActive(s).experiences)
  const addExperience = useResumeStore((s) => s.addExperience)
  const reorderExperiences = useResumeStore((s) => s.reorderExperiences)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const oldIdx = experiences.findIndex((e) => e.id === active.id)
    const newIdx = experiences.findIndex((e) => e.id === over.id)
    reorderExperiences(arrayMove(experiences, oldIdx, newIdx))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Experiências</h3>
        <Button size="sm" onClick={addExperience} type="button">+ Adicionar</Button>
      </div>
      {experiences.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">Nenhuma experiência adicionada.</p>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={experiences.map((e) => e.id)} strategy={verticalListSortingStrategy}>
          {experiences.map((item) => <ExperienceItem key={item.id} item={item} />)}
        </SortableContext>
      </DndContext>
    </div>
  )
}
