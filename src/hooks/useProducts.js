import { useEffect, useState } from 'react'
import axios from 'axios'
import { getProducts } from '../services/api'

export function useProducts(limit = 12) {
  // Un único objeto agrupa loading, data y error. Cuando termina el fetch,
  // una sola llamada a setState sincroniza toda la UI y evita renders
  // intermedios provocados por actualizar cada estado por separado.
  const [state, setState] = useState({ loading: true, data: [], error: null })
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      try {
        const products = await getProducts(limit, controller.signal)
        // La respuesta actualiza loading, data y error en una sola transición.
        setState({ loading: false, data: products, error: null })
      } catch (error) {
        if (axios.isCancel(error) || error.name === 'CanceledError') return
        // Los errores siguen la misma transición única y explícita.
        setState({ loading: false, data: [], error: error.message || 'No se pudo cargar el catálogo' })
      }
    }

    load()
    // Si List se desmonta o cambia el límite, se cancela la petición anterior
    // para evitar actualizar un componente que ya no está activo.
    return () => controller.abort()
  }, [limit, reloadKey])

  const retry = () => {
    setState((previous) => ({ ...previous, loading: true, error: null }))
    setReloadKey((key) => key + 1)
  }

  return { ...state, retry }
}
