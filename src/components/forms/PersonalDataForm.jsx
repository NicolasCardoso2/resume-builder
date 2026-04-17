import { useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import useResumeStore, { selectActive } from '../../store/useResumeStore'
import Input from '../ui/Input'

export default function PersonalDataForm() {
  const personal = useResumeStore((s) => selectActive(s).personal)
  const setPersonal = useResumeStore((s) => s.setPersonal)
  const fileInputRef = useRef(null)

  const { register, watch, setValue } = useForm({ defaultValues: personal })

  useEffect(() => {
    const sub = watch((values) => setPersonal(values))
    return () => sub.unsubscribe()
  }, [watch, setPersonal])

  const photo = watch('photo')

  function handlePhotoChange(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      setValue('photo', ev.target.result, { shouldDirty: true })
      setPersonal({ photo: ev.target.result })
    }
    reader.readAsDataURL(file)
  }

  function handleRemovePhoto() {
    setValue('photo', '', { shouldDirty: true })
    setPersonal({ photo: '' })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-bold text-gray-700 tracking-tight">Dados Pessoais</h3>
        <div className="flex-1 h-px bg-gray-100" />
      </div>

      {/* Photo upload */}
      <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          title="Clique para alterar a foto"
          className="group relative w-20 h-20 rounded-full bg-white border-2 border-dashed border-gray-300 hover:border-blue-400 overflow-hidden flex items-center justify-center shrink-0 transition-colors shadow-sm"
        >
          {photo ? (
            <>
              <img src={photo} alt="Foto" className="w-full h-full object-cover" />
              <span className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
            </>
          ) : (
            <span className="flex flex-col items-center gap-1">
              <svg className="w-7 h-7 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </span>
          )}
        </button>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-gray-700">Foto de perfil</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-200 text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors shadow-sm"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {photo ? 'Trocar foto' : 'Escolher foto'}
          </button>
          {photo && (
            <button
              type="button"
              onClick={handleRemovePhoto}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-white border border-gray-100 text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors shadow-sm"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Remover
            </button>
          )}
          <p className="text-[11px] text-gray-400">JPG ou PNG, max 2MB</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handlePhotoChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Nome completo" {...register('name')} placeholder="João Silva" title="Seu nome como deve aparecer no currículo" />
        <Input label="Titulo / Cargo" {...register('title')} placeholder="Desenvolvedor Full Stack" title="Cargo atual ou área de atuação" />
        <Input label="E-mail" type="email" {...register('email')} placeholder="joao@email.com" title="E-mail de contato profissional" />
        <Input label="Telefone" {...register('phone')} placeholder="+55 11 91234-5678" title="Número com DDD e código do país" />
        <Input label="Cidade / Estado" {...register('location')} placeholder="Sao Paulo, SP" title="Onde você está localizado" />
        <Input label="LinkedIn" {...register('linkedin')} placeholder="linkedin.com/in/joao" title="URL do seu perfil no LinkedIn" />
        <Input label="GitHub" {...register('github')} placeholder="github.com/joao" title="URL do seu perfil no GitHub" />
        <Input label="Website / Portfolio" {...register('website')} placeholder="joao.dev" title="Link para seu portfolio ou site pessoal" />
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700 block mb-1">
          Resumo profissional
          <span className="ml-1 text-gray-400 font-normal text-xs" title="3 a 5 linhas descrevendo sua experiência, habilidades e objetivos">(?)</span>
        </label>
        <textarea
          {...register('summary')}
          rows={4}
          placeholder="Breve descrição sobre você, suas habilidades e objetivos..."
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>
    </div>
  )
}
