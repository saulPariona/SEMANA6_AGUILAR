import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import List from './pages/List'
import Form from './pages/Form'
import NotFound from './pages/NotFound'
import NetworkAudit from './components/NetworkAudit'
import s from './styles/ui.module.css'

export default function App() {
  return (
    <div className={s.app}>
      <Navbar />
      <main className={s.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<List />} />
          <Route path="/pedido" element={<Form />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <NetworkAudit />
    </div>
  )
}
