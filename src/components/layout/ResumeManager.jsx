import { useState, useRef, useEffect } from 'react'
import useResumeStore from '../../store/useResumeStore'

function ResumeRow({ resume, isActive, onSwitch, onDuplicate, onDelete, onRename }) {
  const [editing, setEditing] = useState(false)
  const [draftName, setDraftName] = useState(resume.name)
  const inputRef = useRef(null)

  useEffect(() => {
    if (editing) inputRef.current?.select()
  }, [editing])

  function commitRename() {
    const trimmed = draftName.trim()
    if (trimmed && trimmed !== resume.name) onRename(resume.id, trimmed)
    else setDraftName(resume.name)
    setEditing(false)
  }

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer group transition-colors
        ${isActive ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50 border border-transparent'}`}
      onClick={() => !editing && onSwitch(resume.id)}
    >
      {/* Active indicator */}
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-blue-600' : 'bg-transparent'}`} />

      {/* Name */}
      {editing ? (
        <input
          ref={inputRef}
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          onBlur={commitRename}
          onKeyDown={(e) => { if (e.key === 'Enter') commitRename(); if (e.key === 'Escape') { setDraftName(resume.name); setEditing(false) } }}
          onClick={(e) => e.stopPropagation()}
          className="flex-1 text-sm border border-blue-400 rounded px-2 py-0.5 outline-none focus:ring-1 focus:ring-blue-500"
        />
      ) : (
        <span
          className="flex-1 text-sm text-gray-800 truncate"
          onDoubleClick={(e) => { e.stopPropagation(); setEditing(true) }}
          title="Clique duplo para renomear"
        >
          {resume.name || 'Sem título'}
        </span>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDuplicate(resume.id) }}
          title="Duplicar currículo"
          className="p-1 rounded text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onDelete(resume.id) }}
          title="Excluir currículo"
          className="p-1 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function ResumeManager() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  const resumes = useResumeStore((s) => s.resumes)
  const activeId = useResumeStore((s) => s.activeId)
  const createResume = useResumeStore((s) => s.createResume)
  const duplicateResume = useResumeStore((s) => s.duplicateResume)
  const deleteResume = useResumeStore((s) => s.deleteResume)
  const switchResume = useResumeStore((s) => s.switchResume)
  const renameResume = useResumeStore((s) => s.renameResume)

  const activeName = resumes.find((r) => r.id === activeId)?.name ?? 'Currículo'

  // Close on outside click
  useEffect(() => {
    if (!open) return
    function onDown(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [open])

  function handleDelete(id) {
    if (resumes.length === 1) return
    if (!window.confirm('Excluir este currículo?')) return
    deleteResume(id)
  }

  function handleNew() {
    createResume('Novo Currículo')
    setOpen(false)
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border
          ${open
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-600'}`}
        title="Gerenciar currículos"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="max-w-[120px] truncate hidden sm:inline">{activeName}</span>
        {resumes.length > 1 && (
          <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {resumes.length}
          </span>
        )}
        <svg className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-1 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Meus Currículos</p>
          </div>

          <div className="max-h-60 overflow-y-auto p-2 space-y-0.5">
            {resumes.map((r) => (
              <ResumeRow
                key={r.id}
                resume={r}
                isActive={r.id === activeId}
                onSwitch={(id) => { switchResume(id); setOpen(false) }}
                onDuplicate={duplicateResume}
                onDelete={handleDelete}
                onRename={renameResume}
              />
            ))}
          </div>

          <div className="p-2 border-t border-gray-100">
            <button
              type="button"
              onClick={handleNew}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Novo currículo
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
