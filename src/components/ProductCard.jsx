import { Star, Clock } from 'lucide-react'
import s from '../styles/ui.module.css'

const fallbackImage = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85'

export default function ProductCard({ product, children }) {
  return (
    <article className={s.card}>
      <img className={s.cardImg} src={product.image} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} />
      <div className={s.cardBody}>
        <span className={s.badge}>{product.tag}</span>
        <h3>{product.name}</h3>
        <div className={s.meta}>
          <span><Star size={14} /> {product.rating}</span>
          <span><Clock size={14} /> {product.minutes} min</span>
        </div>
        <div className={s.cardFoot}>
          <span className={s.price}>S/ {product.price}.00</span>
          {children}
        </div>
      </div>
    </article>
  )
}
