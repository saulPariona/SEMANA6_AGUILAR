import { useState } from 'react'
import { Link } from 'react-router-dom'
import { LayoutGrid, Search, X, RefreshCw, TriangleAlert, SearchX, ShoppingBag } from 'lucide-react'
import Section from '../components/Section'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import s from '../styles/ui.module.css'

export default function List() {
  const { loading, data, error, retry } = useProducts(30)
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('todos')
  // El buscador y el filtro se derivan durante el render. No se guardan
  // resultados filtrados en otro estado, así escribir no dispara otro fetch
  // ni crea una segunda sincronización de datos.
  const tags = ['todos', ...new Set(data.map((product) => product.tag))]
  const visible = data.filter((product) =>
    (tag === 'todos' || product.tag === tag) &&
    product.name.toLowerCase().includes(query.toLowerCase()),
  )

  return (
    <Section title="Nuestro catálogo" subtitle={`${data.length} opciones dulces para elegir. Encuentra tu favorito y pídelo en un clic.`} icon={LayoutGrid}>
      <div className={s.toolbar}>
        <div className={s.searchBox}><Search size={18} /><input type="text" placeholder="Buscar pastel o torta..." value={query} onChange={(event) => setQuery(event.target.value)} /></div>
        <select className={s.select} style={{ width: 'auto' }} value={tag} onChange={(event) => setTag(event.target.value)}>
          {tags.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        {query && <button className={`${s.btn} ${s.btnGhost}`} onClick={() => setQuery('')}><X size={16} /> Limpiar</button>}
      </div>
      {loading ? <div className={s.state}><div className={s.spinner} /><p>Horneando el catálogo...</p></div>
        : error ? <div className={`${s.state} ${s.stateError}`}><TriangleAlert size={40} /><p>{error}</p><button className={s.btn} onClick={retry}><RefreshCw size={16} /> Reintentar</button></div>
          : visible.length === 0 ? <div className={s.state}><SearchX size={40} /><p>No encontramos resultados.</p></div>
            : <div className={s.grid}>{visible.map((product) => <ProductCard key={product.id} product={product}><Link to="/pedido" className={s.btn} style={{ padding: '9px 14px' }}><ShoppingBag size={16} /> Pedir</Link></ProductCard>)}</div>}
    </Section>
  )
}
