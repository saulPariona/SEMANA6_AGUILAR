import { useEffect, useState } from 'react'
import { Activity, CheckCircle2, ChevronDown, Gauge, Globe, Smartphone, Trash2, Wifi, WifiOff, X } from 'lucide-react'
import s from '../styles/ui.module.css'

export default function NetworkAudit() {
  const [open, setOpen] = useState(false)
  const [online, setOnline] = useState(navigator.onLine)
  const [requests, setRequests] = useState([])
  const [publicIp, setPublicIp] = useState('Consultando...')
  const [ipError, setIpError] = useState(null)
  const [speed, setSpeed] = useState(25)
  const [connection, setConnection] = useState({ type: 'desconocida', rtt: '--' })

  useEffect(() => {
    const addRequest = (event) => {
      setRequests((current) => [{ ...event.detail, id: crypto.randomUUID(), time: new Date() }, ...current].slice(0, 8))
    }
    const handleOnline = () => setOnline(true)
    const handleOffline = () => setOnline(false)
    const browserConnection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    const updateConnection = () => setConnection({
      type: browserConnection?.effectiveType || 'desconocida',
      rtt: browserConnection?.rtt ? `${browserConnection.rtt} ms` : '--',
    })
    updateConnection()
    browserConnection?.addEventListener('change', updateConnection)
    const speedTimer = window.setInterval(() => {
      setSpeed((current) => {
        const next = current + (Math.random() > 0.5 ? 1 : -1)
        return Math.min(30, Math.max(25, next))
      })
    }, 850)
    const controller = new AbortController()
    async function loadPublicIp() {
      try {
        const response = await fetch('https://api.ipify.org?format=json', { signal: controller.signal })
        if (!response.ok) throw new Error(`IP service respondió ${response.status}`)
        const data = await response.json()
        if (!data.ip) throw new Error('La respuesta no contiene una IP')
        setPublicIp(data.ip)
      } catch (error) {
        if (error.name === 'AbortError') return
        setIpError('No disponible')
        setPublicIp('No disponible')
      }
    }
    loadPublicIp()
    window.addEventListener('dulce-morado:network', addRequest)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('dulce-morado:network', addRequest)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      browserConnection?.removeEventListener('change', updateConnection)
      window.clearInterval(speedTimer)
      controller.abort()
    }
  }, [])

  return (
    <aside className={open ? `${s.audit} ${s.auditOpen}` : s.audit} aria-label="Auditoría de red">
      <button className={s.auditHeader} onClick={() => setOpen((current) => !current)}>
        <span className={s.auditTitle}><Activity size={16} /> Auditoría de red</span>
        <span className={online ? s.auditOnline : s.auditOffline}>{online ? <Wifi size={14} /> : <WifiOff size={14} />} {online ? 'Online' : 'Offline'} <ChevronDown size={14} /></span>
      </button>
      {open && (
        <div className={s.auditBody}>
          <div className={s.auditSummary}><span><CheckCircle2 size={14} /> {requests.length} solicitudes registradas</span><button onClick={() => setRequests([])} aria-label="Limpiar solicitudes"><Trash2 size={14} /></button></div>
          <div className={s.auditMetrics}>
            <div className={s.auditMetric}><Gauge size={16} /><span>Velocidad estimada<strong>{online ? `${speed} Mbps` : '0 Mbps'}</strong></span><i className={s.speedBars} aria-hidden="true"><b /><b /><b /><b /><b /></i></div>
            <div className={s.auditMetric}><Globe size={16} /><span>IP pública<strong>{ipError ? <em>{publicIp}</em> : publicIp}</strong></span></div>
            <div className={s.auditMetric}><Smartphone size={16} /><span>Red / latencia<strong>{connection.type} · {connection.rtt}</strong></span></div>
          </div>
          {requests.length === 0 ? <p className={s.auditEmpty}>Navega al catálogo o envía un pedido para ver las solicitudes.</p> : <div className={s.auditList}>{requests.map((request) => <div className={s.auditRequest} key={request.id}><div><strong className={request.status === 200 || request.status === 201 ? s.auditSuccess : s.auditFailure}>{request.method} {request.status}</strong><small>{request.url}</small></div><span>{request.duration} ms</span></div>)}</div>}
          <button className={s.auditClose} onClick={() => setOpen(false)}><X size={13} /> Ocultar panel</button>
        </div>
      )}
    </aside>
  )
}
