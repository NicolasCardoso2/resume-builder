import { Link, useLocation } from 'react-router-dom'
import Button from '../ui/Button'

export default function Header() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm h-14 flex items-center px-6 gap-4">
      <Link to="/" className="text-lg font-bold text-blue-600 shrink-0">
        CV Criador
      </Link>

      <nav className="flex items-center gap-2 ml-4">
        <Link
          to="/editor"
          className={`text-sm px-3 py-1.5 rounded-lg transition-colors
            ${location.pathname === '/editor' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Editor
        </Link>
        <Link
          to="/templates"
          className={`text-sm px-3 py-1.5 rounded-lg transition-colors
            ${location.pathname === '/templates' ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Templates
        </Link>
      </nav>

      <div className="ml-auto">
        <Button as={Link} to="/editor" size="sm">Abrir editor</Button>
      </div>
    </header>
  )
}
