import { BrowserRouter, useLocation } from 'react-router-dom'
import AppRoutes from './routes/AppRoutes'
import Header from './components/layout/Header'

function AppInner() {
  const location = useLocation()
  const isEditor = location.pathname === '/editor'

  return (
    <div className="min-h-screen flex flex-col">
      {!isEditor && <Header />}
      <AppRoutes />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
