import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import useResumeStore, { selectActive } from '../../store/useResumeStore'
import SortableItem from '../ui/SortableItem'
import Input from '../ui/Input'
import Button from '../ui/Button'

function CertificationItem({ item }) {
  const updateCertification = useResumeStore((s) => s.updateCertification)
  const removeCertification = useResumeStore((s) => s.removeCertification)

  const { register, watch } = useForm({ defaultValues: item })

  useEffect(() => {
    const sub = watch((values) => updateCertification(item.id, values))
    return () => sub.unsubscribe()
  }, [watch, item.id, updateCertification])

  return (
    <SortableItem id={item.id}>
      {({ handleProps }) => (
        <div className="border border-gray-200 rounded-xl p-4 space-y-3 bg-white">
          <div className="flex items-start gap-1">
            <button type="button" className="cursor-grab active:cursor-grabbing p-1 text-gray-300 hover:text-gray-500 shrink-0 mt-0.5 touch-none" {...handleProps}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <circle cx="5" cy="4" r="1.2"/><circle cx="11" cy="4" r="1.2"/>
                <circle cx="5" cy="8" r="1.2"/><circle cx="11" cy="8" r="1.2"/>
                <circle cx="5" cy="12" r="1.2"/><circle cx="11" cy="12" r="1.2"/>
              </svg>
            </button>
            <div className="flex-1 space-y-3">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Input label="Certificação / Curso" {...register('name')} placeholder="AWS Solutions Architect" title="Nome do certificado ou curso" />
                <Input label="Instituição" {...register('issuer')} placeholder="Amazon, Alura, Coursera..." title="Quem emitiu o certificado" />
                <Input label="Data de conclusão" type="month" {...register('date')} />
              </div>
              <Button variant="danger" size="sm" type="button" onClick={() => removeCertification(item.id)}>Remover</Button>
            </div>
          </div>
        </div>
      )}
    </SortableItem>
  )
}

export default function CertificationsForm() {
  const certifications = useResumeStore((s) => selectActive(s).certifications)
  const addCertification = useResumeStore((s) => s.addCertification)
  const reorderCertifications = useResumeStore((s) => s.reorderCertifications)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))

  function handleDragEnd({ active, over }) {
    if (!over || active.id === over.id) return
    const oldIdx = certifications.findIndex((c) => c.id === active.id)
    const newIdx = certifications.findIndex((c) => c.id === over.id)
    reorderCertifications(arrayMove(certifications, oldIdx, newIdx))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Certificações</h3>
        <Button size="sm" onClick={addCertification} type="button">+ Adicionar</Button>
      </div>
      {certifications.length === 0 && (
        <p className="text-sm text-gray-400 text-center py-4">Nenhuma certificação adicionada.</p>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={certifications.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          {certifications.map((item) => <CertificationItem key={item.id} item={item} />)}
        </SortableContext>
      </DndContext>
    </div>
  )
}
