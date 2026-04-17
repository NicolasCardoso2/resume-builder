import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    ),
    title: 'Editor intuitivo',
    desc: 'Preencha seus dados em formulários simples e veja o resultado ao vivo.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: '3 templates profissionais',
    desc: 'Moderno, Clássico e Minimalista. Escolha o que melhor te representa.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: 'Exportação em PDF',
    desc: 'Um clique para gerar o PDF em formato A4 pronto para enviar.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>
    ),
    title: 'Cor personalizada',
    desc: 'Escolha a cor de destaque do currículo para combinar com seu estilo.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: 'Foto de perfil',
    desc: 'Adicione sua foto ao currículo com um simples upload.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 5.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
    title: 'Salvo automaticamente',
    desc: 'Seus dados ficam salvos no navegador. Nada se perde ao fechar a aba.',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 pt-20 pb-16">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide">
          100% gratuito · sem cadastro
        </span>
        <h1 className="text-5xl font-extrabold text-gray-900 leading-tight max-w-2xl mb-5">
          Crie seu currículo<br />
          <span className="text-blue-600">profissional</span> em minutos
        </h1>
        <p className="text-gray-500 text-lg max-w-md mb-10">
          Preencha seus dados, personalize o layout e exporte em PDF. Tudo no navegador.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/editor">
            <Button size="lg" className="shadow-md shadow-blue-200">
              Criar currículo
            </Button>
          </Link>
          <Link to="/templates">
            <Button size="lg" variant="outline">
              Ver templates
            </Button>
          </Link>
        </div>

        {/* Mock preview strip */}
        <div className="mt-14 w-full max-w-3xl bg-white rounded-2xl shadow-xl border border-gray-100 h-64 flex items-center justify-center overflow-hidden">
          <div className="flex gap-4 px-6 w-full">
            {/* Left – form mock */}
            <div className="w-1/3 space-y-2">
              {[80, 60, 70, 50, 65].map((w, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="h-2 bg-gray-200 rounded w-2/3" />
                  <div className="h-6 bg-gray-100 rounded border border-gray-200" style={{ width: `${w}%` }} />
                </div>
              ))}
            </div>
            {/* Divider */}
            <div className="w-px bg-gray-200 self-stretch" />
            {/* Right – preview mock */}
            <div className="flex-1 p-4 space-y-3">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100" />
                <div className="space-y-1">
                  <div className="h-3 bg-gray-800 rounded w-28" />
                  <div className="h-2 bg-blue-400 rounded w-20" />
                </div>
              </div>
              <div className="h-2 bg-blue-600 rounded w-full mb-1" />
              {[90, 70, 80].map((w, i) => (
                <div key={i} className="h-2 bg-gray-200 rounded" style={{ width: `${w}%` }} />
              ))}
              <div className="h-2 bg-blue-600 rounded w-full mt-3 mb-1" />
              {[75, 60].map((w, i) => (
                <div key={i} className="h-2 bg-gray-200 rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">
          Tudo que você precisa
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
