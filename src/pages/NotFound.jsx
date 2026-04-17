import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
      <div className="text-8xl font-extrabold text-gray-100 select-none leading-none mb-2">
        404
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Página não encontrada</h1>
      <p className="text-gray-500 mb-8 max-w-xs">
        A rota que você acessou não existe. Volte ao início ou abra o editor.
      </p>
      <div className="flex gap-3">
        <Link to="/">
          <Button variant="outline">← Início</Button>
        </Link>
        <Link to="/editor">
          <Button>Abrir editor</Button>
        </Link>
      </div>
    </div>
  )
}
