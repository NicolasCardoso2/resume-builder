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
    <button type="button" className="cursor-grab active:cursor-grabbing p-1 text-gray-300 hover:text-gray-500 shrink-0 mt-0.5 touch-none" title="Arrastar para reordenar" {...handleProps}>
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <circle cx="5" cy="4" r="1.2"/><circle cx="11" cy="4" r="1.2"/>
        <circle cx="5" cy="8" r="1.2"/><circle cx="11" cy="8" r="1.2"/>
        <circle cx="5" cy="12" r="1.2"/><circle cx="11" cy="12" r="1.2"/>
      </svg>
    </button>
  )
}

function ProjectItem({ item }) {
  const updateProject = useResumeStore((s) => s.updateProject)
  const removeProject = useResumeStore((s) => s.removeProject)

  const { register, watch } = useForm({ defaultValues: item })

  useEffect(() => {
    const sub = watch((values) => updateProject(item.id, values))
    return () => sub.unsubscribe()
  }, [watch, item.id, updateProject])

  return (
    <SortableItem id={item.id}>
      {({ handleProps }) => (
        <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-white">
          <div className="flex items-start gap-1">
            <DragHandle handleProps={handleProps} />
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input label="Nome do projeto" {...register('name')} placeholder="Meu App Incrível" />
                <Input label="URL / Link" {...register('url')} placeholder="https://github.com/..." />
                <div className="sm:col-span-2">
                  <Input label="Tecnologias" {...register('technologies')} placeholder="React, Node.js, PostgreSQL" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Descrição</label>
                <textarea
                  {...register('description')}
                  rows={3}
                  placeholder="O que esse projeto faz e qual problema resolve..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <Button variant="danger" size="sm" type="button" onClick={() => removeProject(item.id)}>Remover</Button>
            </div>
          </div>
        </div>
      )}
    </SortableItem>
  )
}

export default function ProjectsForm() {
  const projects = useResumeStore((s) => selectActive(s).projects)
  const addProject = useResumeStore((s) => s.addProject)
  const reorderProjects = useResumeStore((s) => s.reorderProjects)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const oldIdx = projects.findIndex((p) => p.id === active.id)
    const newIdx = projects.findIndex((p) => p.id === over.id)
    reorderProjects(arrayMove(projects, oldIdx, newIdx))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Projetos</h3>
        <Button size="sm" onClick={addProject} type="button">+ Adicionar</Button>
      </div>
      {projects.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">Nenhum projeto adicionado.</p>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={projects.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          {projects.map((item) => <ProjectItem key={item.id} item={item} />)}
        </SortableContext>
      </DndContext>
    </div>
  )
}
