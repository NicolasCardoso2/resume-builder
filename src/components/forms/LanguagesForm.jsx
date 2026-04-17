import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import useResumeStore, { selectActive } from '../../store/useResumeStore'
import SortableItem from '../ui/SortableItem'
import Input from '../ui/Input'
import Button from '../ui/Button'

const LEVELS = ['Básico', 'Pré-intermediário', 'Intermediário', 'Avançado', 'Fluente', 'Nativo']

function LanguageItem({ item }) {
  const updateLanguage = useResumeStore((s) => s.updateLanguage)
  const removeLanguage = useResumeStore((s) => s.removeLanguage)

  const { register, watch } = useForm({ defaultValues: item })

  useEffect(() => {
    const sub = watch((values) => updateLanguage(item.id, values))
    return () => sub.unsubscribe()
  }, [watch, item.id, updateLanguage])

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
          <div className="flex-1">
            <Input {...register('name')} placeholder="Ex: Inglês, Espanhol..." />
          </div>
          <div className="min-w-[130px]">
            <select
              {...register('level')}
              className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          <button type="button" onClick={() => removeLanguage(item.id)} className="text-red-400 hover:text-red-600 text-lg leading-none" title="Remover">x</button>
        </div>
      )}
    </SortableItem>
  )
}

export default function LanguagesForm() {
  const languages = useResumeStore((s) => selectActive(s).languages)
  const addLanguage = useResumeStore((s) => s.addLanguage)
  const reorderLanguages = useResumeStore((s) => s.reorderLanguages)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const oldIdx = languages.findIndex((l) => l.id === active.id)
    const newIdx = languages.findIndex((l) => l.id === over.id)
    reorderLanguages(arrayMove(languages, oldIdx, newIdx))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Idiomas</h3>
        <Button size="sm" onClick={addLanguage} type="button">+ Adicionar</Button>
      </div>
      {languages.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">Nenhum idioma adicionado.</p>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={languages.map((l) => l.id)} strategy={verticalListSortingStrategy}>
          {languages.map((item) => <LanguageItem key={item.id} item={item} />)}
        </SortableContext>
      </DndContext>
    </div>
  )
}
