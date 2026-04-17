import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Wrap a list item with this to make it sortable.
// Passes { handleProps } down via render-prop children so you can attach
// the drag handle to just one element instead of the whole card.
export default function SortableItem({ id, children }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'opacity-50 z-10 relative' : ''}
    >
      {children({ handleProps: { ...attributes, ...listeners } })}
    </div>
  )
}
