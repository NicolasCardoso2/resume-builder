import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Editor from '../pages/Editor'
import Templates from '../pages/Templates'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/editor" element={<Editor />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
