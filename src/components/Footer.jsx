import { MapPin, Phone, Mail, Sparkles } from 'lucide-react'
import s from '../styles/ui.module.css'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <div className={`${s.container} ${s.footerInner}`}>
        <div className={s.footerBrand}><img className={s.footerLogo} src="/logo.webp" alt="" /><strong>Dulce Morado</strong><small>© 2026 Todos los derechos reservados</small></div>
        <div className={s.footerContact}>
          <span><MapPin size={18} /> Huancayo, Junín</span>
          <a href="tel:+51923791008"><Phone size={18} /> 923 791 008</a>
          <a href="mailto:sparionaramos7601@gmail.com"><Mail size={18} /> sparionaramos7601@gmail.com</a>
          <span><Sparkles size={18} /> Atención personalizada</span>
        </div>
      </div>
    </footer>
  )
}
