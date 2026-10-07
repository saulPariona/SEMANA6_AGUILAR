import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Home, LayoutGrid, ClipboardList, Sun, Moon, Menu, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import s from '../styles/ui.module.css'

const links = [
  { to: '/', label: 'Inicio', icon: Home, end: true },
  { to: '/catalogo', label: 'Catálogo', icon: LayoutGrid },
  { to: '/pedido', label: 'Hacer pedido', icon: ClipboardList },
]

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const [open, setOpen] = useState(false)
  return (
    <header className={s.header}>
      <div className={`${s.container} ${s.headerInner}`}>
        <Link to="/" className={s.brand} onClick={() => setOpen(false)}>
          <img className={s.logo} src="/logo.webp" alt="Dulce Morado" />
          <span>Dulce Morado</span>
        </Link>
        <nav className={open ? `${s.nav} ${s.navOpen}` : s.nav}>
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setOpen(false)}
              className={({ isActive }) => isActive ? `${s.link} ${s.active}` : s.link}>
              <Icon size={18} /> {label}
            </NavLink>
          ))}
        </nav>
        <div className={s.actions}>
          <button className={s.iconBtn} onClick={toggle} aria-label="Cambiar tema" title="Cambiar tema">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={`${s.iconBtn} ${s.menuBtn}`} onClick={() => setOpen((current) => !current)} aria-label="Menú">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  )
}
