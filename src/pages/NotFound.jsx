import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import s from '../styles/ui.module.css'

export default function NotFound() {
  return <div className={`${s.container} ${s.notFound}`}><h1>404</h1><h2>Esta página se quemó en el horno</h2><p>La ruta que buscas no existe.</p><Link to="/" className={s.btn}><Home size={18} /> Volver al inicio</Link></div>
}
