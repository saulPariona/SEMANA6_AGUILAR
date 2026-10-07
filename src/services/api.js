import axios from 'axios'

const http = axios.create({ baseURL: 'https://dummyjson.com', timeout: 10000 })
const bakeryProducts = [
  { id: 1001, name: 'Torta de chocolate', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85', rating: 4.9, minutes: 45, tag: 'Tortas', price: 68 },
  { id: 1002, name: 'Cupcakes de vainilla', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85', rating: 4.8, minutes: 30, tag: 'Cupcakes', price: 36 },
  { id: 1003, name: 'Torta de frutas frescas', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', rating: 4.9, minutes: 50, tag: 'Tortas', price: 72 },
  { id: 1004, name: 'Cheesecake artesanal', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=85', rating: 4.8, minutes: 40, tag: 'Postres', price: 58 },
  { id: 1005, name: 'Torta red velvet', image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?auto=format&fit=crop&w=900&q=85', rating: 4.9, minutes: 55, tag: 'Tortas', price: 75 },
  { id: 1006, name: 'Macarons surtidos', image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=900&q=85', rating: 4.7, minutes: 35, tag: 'Bocaditos', price: 42 },
  { id: 1007, name: 'Tarta de limón', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85', rating: 4.8, minutes: 45, tag: 'Tartas', price: 54 },
  { id: 1008, name: 'Brownies con nueces', image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=900&q=85', rating: 4.9, minutes: 30, tag: 'Bocaditos', price: 32 },
]

function reportRequest(request) {
  window.dispatchEvent(new CustomEvent('dulce-morado:network', { detail: request }))
}

export async function getProducts(limit, signal) {
  const startedAt = performance.now()
  try {
    const { data } = await http.get('/recipes', {
      params: { limit: 0, select: 'name,image,rating,prepTimeMinutes,tags,mealType' },
      signal,
    })
    reportRequest({ method: 'GET', url: '/recipes', status: 200, duration: Math.round(performance.now() - startedAt) })
    const apiProducts = data.recipes
      .filter((recipe) => recipe.mealType?.includes('Dessert'))
      .map((recipe) => ({
        id: recipe.id,
        name: recipe.name,
        image: recipe.image,
        rating: recipe.rating,
        minutes: recipe.prepTimeMinutes,
        tag: recipe.tags?.[0] ?? 'Postre',
        price: 18 + ((recipe.id * 7) % 42),
      }))
    return [...apiProducts, ...bakeryProducts].slice(0, limit)
  } catch (error) {
    reportRequest({
      method: 'GET',
      url: '/recipes',
      status: error.response?.status || (error.name === 'CanceledError' ? 'CANCEL' : 'ERROR'),
      duration: Math.round(performance.now() - startedAt),
    })
    throw error
  }
}

export async function sendOrder(order) {
  const startedAt = performance.now()
  try {
    const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', order)
    reportRequest({ method: 'POST', url: 'jsonplaceholder.typicode.com/posts', status: 201, duration: Math.round(performance.now() - startedAt) })
    return data
  } catch (error) {
    reportRequest({ method: 'POST', url: 'jsonplaceholder.typicode.com/posts', status: error.response?.status || 'ERROR', duration: Math.round(performance.now() - startedAt) })
    throw error
  }
}
