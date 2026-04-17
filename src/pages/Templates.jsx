import { Link } from 'react-router-dom'
import useResumeStore, { selectActive } from '../store/useResumeStore'
import Button from '../components/ui/Button'

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Moderno',
    tag: 'Mais popular',
    description: 'Layout limpo com barra de destaque colorida. Ideal para tecnologia e startups.',
    preview: <ModernPreview />,
  },
  {
    id: 'classic',
    name: 'Clássico',
    tag: 'Formal',
    description: 'Cabeçalho centralizado com serifa. Elegante para cargos executivos e tradicionais.',
    preview: <ClassicPreview />,
  },
  {
    id: 'minimal',
    name: 'Minimalista',
    tag: 'Limpo',
    description: 'Tipografia simples e sem excessos. Deixa o conteúdo falar por si mesmo.',
    preview: <MinimalPreview />,
  },
]

function ModernPreview() {
  return (
    <div className="h-44 bg-white rounded-lg overflow-hidden border border-gray-100 flex text-left">
      {/* Sidebar */}
      <div className="w-[36%] bg-blue-50 border-r border-blue-100 p-2 flex flex-col gap-2">
        {/* Photo */}
        <div className="w-8 h-8 rounded-full bg-blue-200 mx-auto mb-1 shrink-0" />
        {/* Contact section title */}
        <div className="h-1.5 bg-blue-400 rounded w-10 mb-0.5" />
        {/* Contact rows: icon + text */}
        {[22, 26, 20].map((w, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-sm bg-blue-300 shrink-0" />
            <div className="h-1.5 bg-gray-300 rounded" style={{ width: `${w}px` }} />
          </div>
        ))}
        {/* Skills section title */}
        <div className="h-1.5 bg-blue-400 rounded w-12 mt-1 mb-0.5" />
        {[18, 24, 16, 20].map((w, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-sm bg-blue-300 shrink-0" />
            <div className="h-1.5 bg-gray-300 rounded" style={{ width: `${w}px` }} />
          </div>
        ))}
      </div>
      {/* Main */}
      <div className="flex-1 p-2 flex flex-col">
        {/* Name + title + divider */}
        <div className="mb-1.5 pb-1.5 border-b-2 border-blue-500">
          <div className="h-2.5 bg-gray-800 rounded w-20 mb-1" />
          <div className="h-1.5 bg-blue-500 rounded w-14" />
        </div>
        {/* Section title */}
        <div className="h-1.5 bg-blue-500 rounded w-16 mb-1" />
        {/* Content rows */}
        {[90, 75, 82].map((w, i) => (
          <div key={i} className="h-1.5 bg-gray-200 rounded mb-1" style={{ width: `${w}%` }} />
        ))}
        {/* Section title */}
        <div className="h-1.5 bg-blue-500 rounded w-20 mt-1.5 mb-1" />
        {/* Experience entry */}
        <div className="flex justify-between mb-0.5">
          <div className="h-1.5 bg-gray-700 rounded w-16" />
          <div className="h-1.5 bg-gray-300 rounded w-10" />
        </div>
        <div className="h-1.5 bg-blue-400 rounded w-12 mb-1" />
        {[85, 65].map((w, i) => (
          <div key={i} className="h-1.5 bg-gray-200 rounded mb-1" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  )
}

function ClassicPreview() {
  return (
    <div className="h-44 bg-white rounded-lg p-3 text-left overflow-hidden border border-gray-100">
      {/* Header: name left, contacts right */}
      <div className="flex justify-between items-start mb-1.5 pb-1.5 border-b-2 border-amber-600">
        <div>
          <div className="h-3 bg-gray-800 rounded w-20 mb-1" />
          <div className="h-1.5 bg-amber-600 rounded w-14" />
        </div>
        <div className="flex flex-col items-end gap-1 mt-0.5">
          {[22, 18, 26].map((w, i) => (
            <div key={i} className="h-1.5 bg-gray-300 rounded" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>
      {/* Section title */}
      <div className="h-1.5 bg-amber-600 rounded w-14 mb-1" />
      {[90, 75, 65].map((w, i) => (
        <div key={i} className="h-1.5 bg-gray-200 rounded mb-1" style={{ width: `${w}%` }} />
      ))}
      {/* Section title */}
      <div className="h-1.5 bg-amber-600 rounded w-16 mt-2 mb-1" />
      <div className="flex justify-between mb-0.5">
        <div className="h-1.5 bg-gray-700 rounded w-16" />
        <div className="h-1.5 bg-gray-300 rounded w-10" />
      </div>
      {[80, 65].map((w, i) => (
        <div key={i} className="h-1.5 bg-gray-200 rounded mb-1" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

function MinimalPreview() {
  return (
    <div className="h-44 bg-white rounded-lg p-3 text-left overflow-hidden border border-gray-100">
      {/* Name block */}
      <div className="mb-3">
        <div className="h-3 bg-gray-900 rounded w-20 mb-1" />
        <div className="h-1.5 bg-gray-400 rounded w-14 mb-1.5" />
        <div className="flex gap-2">
          {[20, 16, 24].map((w, i) => (
            <div key={i} className="h-1.5 bg-gray-300 rounded" style={{ width: `${w}px` }} />
          ))}
        </div>
      </div>
      {/* Section label (tiny uppercase gray) */}
      <div className="h-1 bg-gray-300 rounded w-10 mb-1.5" />
      {[88, 72, 62].map((w, i) => (
        <div key={i} className="h-1.5 bg-gray-200 rounded mb-1" style={{ width: `${w}%` }} />
      ))}
      {/* Second section */}
      <div className="h-1 bg-gray-300 rounded w-12 mt-2 mb-1.5" />
      <div className="flex justify-between mb-1">
        <div className="h-1.5 bg-gray-600 rounded w-16" />
        <div className="h-1.5 bg-gray-300 rounded w-10" />
      </div>
      {[78, 58].map((w, i) => (
        <div key={i} className="h-1.5 bg-gray-200 rounded mb-1" style={{ width: `${w}%` }} />
      ))}
    </div>
  )
}

export default function Templates() {
  const template = useResumeStore((s) => selectActive(s).template)
  const setTemplate = useResumeStore((s) => s.setTemplate)

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Escolha seu template</h1>
        <p className="text-gray-500">Selecione o estilo que melhor representa você.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {TEMPLATES.map((t) => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`text-left rounded-2xl border-2 transition-all hover:shadow-lg overflow-hidden w-full
              ${template === t.id
                ? 'border-blue-600 shadow-md shadow-blue-100'
                : 'border-gray-200 bg-white hover:border-gray-300'}`}
          >
            {/* Preview area */}
            <div className={`p-4 ${template === t.id ? 'bg-blue-50' : 'bg-gray-50'}`}>
              {t.preview}
            </div>

            {/* Info */}
            <div className="p-4 bg-white">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold text-gray-800">{t.name}</h3>
                <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                  {t.tag}
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{t.description}</p>
              {template === t.id && (
                <div className="mt-3 flex items-center gap-1 text-blue-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-semibold">Selecionado</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link to="/editor">
          <Button size="lg">Abrir editor →</Button>
        </Link>
      </div>
    </div>
  )
}
