import s from '../styles/ui.module.css'

export default function Section({ title, subtitle, icon: Icon, children }) {
  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.sectionHead}>
          {Icon && <span className={s.sectionIcon}><Icon size={22} /></span>}
          <h2>{title}</h2>
        </div>
        {subtitle && <p className={s.sectionSub}>{subtitle}</p>}
        {children}
      </div>
    </section>
  )
}
