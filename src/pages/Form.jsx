import { useState } from 'react'
import { ClipboardList, Send, Trash2, CircleCheck, TriangleAlert, ListChecks, Inbox } from 'lucide-react'
import Section from '../components/Section'
import { sendOrder } from '../services/api'
import s from '../styles/ui.module.css'

const emptyForm = { name: '', phone: '', type: 'Torta', quantity: 1, date: '', notes: '' }
const types = ['Torta', 'Pastel', 'Cupcakes', 'Galletas', 'Postre individual']
const today = new Date().toISOString().split('T')[0]

function validate(form) {
  const errors = {}
  if (form.name.trim().length < 3) errors.name = 'Ingresa tu nombre completo'
  if (!/^9\d{8}$/.test(form.phone)) errors.phone = 'Celular de 9 dígitos que empiece con 9'
  if (Number(form.quantity) < 1) errors.quantity = 'Mínimo 1 unidad'
  if (!form.date) errors.date = 'Elige la fecha de entrega'
  return errors
}

export default function Form() {
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(null)
  const [orders, setOrders] = useState([])
  const handleChange = (event) => setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) return
    setSending(true)
    setSendError(null)
    try {
      await sendOrder(form)
      setOrders((previous) => [{ ...form, id: crypto.randomUUID() }, ...previous])
      setForm(emptyForm)
    } catch (error) {
      setSendError(error.message || 'No se pudo enviar el pedido')
    } finally {
      setSending(false)
    }
  }

  const removeOrder = (id) => setOrders((previous) => previous.filter((order) => order.id !== id))
  const errorMessage = (message) => message && <p className={s.error}><TriangleAlert size={14} /> {message}</p>

  return (
    <Section title="Haz tu pedido" subtitle="Completa el formulario y confirmamos por WhatsApp." icon={ClipboardList}>
      <div className={s.formLayout}>
        <form className={s.form} onSubmit={handleSubmit} noValidate>
          <div className={s.field}><label htmlFor="name">Nombre completo</label><input id="name" name="name" className={s.input} value={form.name} onChange={handleChange} />{errorMessage(errors.name)}</div>
          <div className={s.row}>
            <div className={s.field}><label htmlFor="phone">Celular</label><input id="phone" name="phone" inputMode="numeric" maxLength={9} className={s.input} value={form.phone} onChange={handleChange} />{errorMessage(errors.phone)}</div>
            <div className={s.field}><label htmlFor="date">Fecha de entrega</label><input id="date" name="date" type="date" min={today} className={s.input} value={form.date} onChange={handleChange} />{errorMessage(errors.date)}</div>
          </div>
          <div className={s.row}>
            <div className={s.field}><label htmlFor="type">Producto</label><select id="type" name="type" className={s.select} value={form.type} onChange={handleChange}>{types.map((type) => <option key={type} value={type}>{type}</option>)}</select></div>
            <div className={s.field}><label htmlFor="quantity">Cantidad</label><input id="quantity" name="quantity" type="number" min="1" className={s.input} value={form.quantity} onChange={handleChange} />{errorMessage(errors.quantity)}</div>
          </div>
          <div className={s.field}><label htmlFor="notes">Detalles (sabor, dedicatoria, alergias)</label><textarea id="notes" name="notes" className={s.textarea} value={form.notes} onChange={handleChange} /></div>
          {sendError && <p className={s.error}><TriangleAlert size={16} /> {sendError}</p>}
          <button type="submit" className={s.btn} disabled={sending}><Send size={18} /> {sending ? 'Enviando...' : 'Enviar pedido'}</button>
        </form>
        <aside>
          <div className={s.sectionHead}><span className={s.sectionIcon}><ListChecks size={22} /></span><h2 style={{ fontSize: '1.5rem' }}>Pedidos enviados ({orders.length})</h2></div>
          {orders.length === 0 ? <div className={s.state} style={{ marginTop: 20 }}><Inbox size={36} /><p>Aún no has enviado pedidos.</p></div>
            : <div className={s.orders} style={{ marginTop: 20 }}>{orders.map((order) => <div key={order.id} className={s.order}><div><strong><CircleCheck size={14} /> {order.quantity} × {order.type}</strong><small>{order.name} · {order.date}</small></div><button className={s.iconBtn} onClick={() => removeOrder(order.id)} aria-label="Eliminar pedido"><Trash2 size={16} /></button></div>)}</div>}
        </aside>
      </div>
    </Section>
  )
}
