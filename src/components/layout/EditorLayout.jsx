import { useEffect, useState } from 'react'
import { useStore } from 'zustand'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import ResumePreview from '../resume/ResumePreview'
import ResumeManager from './ResumeManager'
import { usePDFExport } from '../../hooks/usePDFExport'
import Button from '../ui/Button'
import useResumeStore, { selectActive } from '../../store/useResumeStore'

export default function EditorLayout() {
  const { ref, handlePrint, exporting } = usePDFExport()
  const [zoom, setZoom] = useState(100)
  const zoomIn  = () => setZoom((z) => Math.min(z + 10, 150))
  const zoomOut = () => setZoom((z) => Math.max(z - 10, 50))
  const zoomReset = () => setZoom(100)
  const resetResume = useResumeStore((s) => s.resetResume)
  const template = useResumeStore((s) => selectActive(s).template)
  const setTemplate = useResumeStore((s) => s.setTemplate)
  const personal = useResumeStore((s) => selectActive(s).personal)

  // Undo / redo via zundo temporal store
  const { undo, redo, pastStates, futureStates } = useStore(useResumeStore.temporal)
  const canUndo = pastStates.length > 0
  const canRedo = futureStates.length > 0

  // Warn before leaving if any data has been entered
  useEffect(() => {
    const hasData = Object.values(personal).some(Boolean)
    function onBeforeUnload(e) {
      if (hasData) { e.preventDefault(); e.returnValue = '' }
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [personal])

  // Keyboard shortcuts: Ctrl+Z = undo, Ctrl+Y / Ctrl+Shift+Z = redo
  useEffect(() => {
    function onKeyDown(e) {
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
      if ((e.ctrlKey && e.key === 'y') || (e.ctrlKey && e.shiftKey && e.key === 'z')) { e.preventDefault(); redo() }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [undo, redo])

  const TEMPLATES = [
    { id: 'modern', label: 'Moderno' },
    { id: 'classic', label: 'Clássico' },
    { id: 'minimal', label: 'Minimalista' },
  ]

  function handleReset() {
    if (window.confirm('Limpar todos os dados do currículo?')) resetResume()
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Editor toolbar */}
      <header className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-200 shrink-0 gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors shrink-0 border border-transparent hover:border-blue-100"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          CV Criador
        </Link>

        {/* Resume manager dropdown */}
        <ResumeManager />

        {/* Template switcher */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors
                ${template === t.id ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {/* Undo / Redo */}
          <button
            onClick={undo}
            disabled={!canUndo}
            title="Desfazer (Ctrl+Z)"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 010 16H3" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10l4-4M3 10l4 4" />
            </svg>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            title="Refazer (Ctrl+Y)"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 10H11a8 8 0 000 16h10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 10l-4-4M21 10l-4 4" />
            </svg>
          </button>

          <div className="w-px h-5 bg-gray-200 mx-0.5" />

          {/* Zoom controls */}
          <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg px-1 py-0.5">
            <button
              onClick={zoomOut}
              disabled={zoom <= 50}
              title="Diminuir zoom"
              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-base leading-none font-bold"
            >−</button>
            <button
              onClick={zoomReset}
              title="Restaurar zoom"
              className="px-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 min-w-[38px] text-center"
            >{zoom}%</button>
            <button
              onClick={zoomIn}
              disabled={zoom >= 150}
              title="Aumentar zoom"
              className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-white rounded transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-base leading-none font-bold"
            >+</button>
          </div>

          <div className="w-px h-5 bg-gray-200 mx-0.5" />

          <button
            onClick={handleReset}
            className="text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1"
            title="Limpar dados"
          >
            Limpar
          </button>
          <Button onClick={handlePrint} size="sm" disabled={exporting}>
            {exporting ? (
              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            )}
            {exporting ? 'Gerando...' : 'Exportar PDF'}
          </Button>
        </div>
      </header>

      {/* Main area */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="flex justify-center">
            <div
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top center',
                marginBottom: zoom < 100 ? `calc((${zoom / 100} - 1) * 297mm)` : 0,
              }}
            >
              <ResumePreview ref={ref} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
