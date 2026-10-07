# Dulce Morado

SPA de una pastelería artesanal desarrollada con React y Vite. Permite
consultar un catálogo, buscar y filtrar productos, registrar pedidos y revisar
las solicitudes de red desde DevTools y desde un panel flotante integrado.

## 1. Configuración del proyecto

### Dependencias

```bash
npm create vite@latest semana6_aguilar
cd semana6_aguilar
npm install
npm install react-router-dom axios lucide-react
```

Dependencias principales:

- React y React DOM.
- Vite.
- `react-router-dom`.
- `axios`.
- `lucide-react`.
- CSS Modules.

### Estructura

```text
src/
├── components/
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── NetworkAudit.jsx
│   ├── ProductCard.jsx
│   └── Section.jsx
├── hooks/
│   ├── useProducts.js
│   └── useTheme.js
├── pages/
│   ├── Form.jsx
│   ├── Home.jsx
│   ├── List.jsx
│   └── NotFound.jsx
├── services/
│   └── api.js
├── styles/
│   └── ui.module.css
├── App.jsx
├── index.css
└── main.jsx
```

El logo de la marca se encuentra en `public/logo.webp`.

## 2. Enrutamiento SPA

Se utiliza `BrowserRouter`, no `HashRouter`, porque la aplicación usa rutas
limpias y navegación del lado del cliente:

```jsx
<BrowserRouter>
  <App />
</BrowserRouter>
```

En `App.jsx` se definen:

```jsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/catalogo" element={<List />} />
  <Route path="/pedido" element={<Form />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

El componente `Navbar` utiliza `NavLink`. En React Router actual,
`activeClassName` fue reemplazado por una función basada en `isActive`:

```jsx
className={({ isActive }) =>
  isActive ? `${s.link} ${s.active}` : s.link
}
```

Esto marca visualmente la página activa sin recargar el navegador.

| Ruta | Página | Función |
|---|---|---|
| `/` | Home | Presentación, carrusel, galería, visión y misión |
| `/catalogo` | List | Productos, búsqueda y filtros |
| `/pedido` | Form | Formulario controlado y pedidos enviados |
| `*` | NotFound | Ruta inexistente |

## 3. Consumo de API con Axios

El consumo se implementa en `src/services/api.js` y
`src/hooks/useProducts.js`.

`getProducts` usa Axios y `async/await`:

```jsx
const { data } = await http.get('/recipes', {
  params: {
    limit: 0,
    select: 'name,image,rating,prepTimeMinutes,tags,mealType',
  },
  signal,
})
```

Los productos de DummyJSON clasificados como postres se combinan con productos
adicionales de pastelería para ampliar el catálogo.

El hook mantiene un único objeto de estado:

```jsx
{
  loading: true,
  data: [],
  error: null
}
```

Se manejan los estados:

- `loading`: muestra “Horneando el catálogo...”.
- `data`: muestra las tarjetas.
- `error`: muestra el error y permite reintentar.

No se usan `.then().catch()` anidados. El flujo utiliza `try/catch/finally`
con `async/await`.

### AbortController

Cada efecto crea un controlador:

```jsx
const controller = new AbortController()
```

La señal se envía a Axios y el cleanup cancela la petición:

```jsx
return () => controller.abort()
```

Esto evita actualizar componentes desmontados y controla las peticiones
duplicadas que pueden aparecer en desarrollo con `StrictMode`.

## 4. Renderizado y formulario

### Renderizado iterativo

El catálogo usa keys estables:

```jsx
visible.map((product) => (
  <ProductCard key={product.id} product={product} />
))
```

Los pedidos también usan un UUID:

```jsx
orders.map((order) => (
  <div key={order.id}>
```

No se utiliza el índice del array como key porque la lista de pedidos puede
eliminar elementos.

### Renderizado condicional

`List.jsx` contempla:

```jsx
loading
  ? <Loading />
  : error
    ? <Error />
    : visible.length === 0
      ? <Empty />
      : <ProductGrid />
```

También se usa `&&` para mostrar el botón de limpiar búsqueda solamente cuando
existe una consulta.

### Formulario controlado

`Form.jsx` utiliza `useState` para controlar todos los campos:

```jsx
const [form, setForm] = useState({
  name: '',
  phone: '',
  type: 'Torta',
  quantity: 1,
  date: '',
  notes: '',
})
```

El mismo `onChange` actualiza cada campo:

```jsx
setForm((previous) => ({
  ...previous,
  [event.target.name]: event.target.value,
}))
```

La validación comprueba nombre, celular, cantidad y fecha. El envío utiliza
`onSubmit`, `async/await`, manejo de error y estado de envío.

## 5. Integración, optimización y auditoría

### Sincronización de estado

`loading`, `data` y `error` se actualizan con una sola llamada:

```jsx
setState({
  loading: false,
  data: products,
  error: null,
})
```

Esto evita tres actualizaciones independientes y renders intermedios.

El filtrado se deriva durante el render:

```jsx
const visible = data.filter(...)
```

No se mantiene una segunda copia de los productos filtrados, por lo que
escribir en el buscador no hace otro `fetch`.

Los comentarios de `useProducts.js` y `List.jsx` documentan esta decisión.

### Panel flotante de auditoría

`NetworkAudit.jsx` muestra:

- Estado online/offline.
- IP pública consultada con `api.ipify.org`.
- Velocidad visual animada entre 25 y 30 Mbps.
- Barras de actividad en movimiento.
- Tipo de conexión.
- Latencia aproximada.
- Últimas ocho solicitudes.
- Método, estado, endpoint y duración.

`api.js` emite eventos personalizados al terminar cada petición:

```jsx
window.dispatchEvent(
  new CustomEvent('dulce-morado:network', {
    detail: request,
  })
)
```

El panel escucha esos eventos y limita el historial a ocho elementos para no
hacer crecer indefinidamente el estado de la interfaz.

### Auditoría con DevTools

1. Ejecutar `npm run dev`.
2. Abrir DevTools con `F12`.
3. Entrar en **Network**.
4. Abrir `/catalogo` y revisar `GET /recipes`.
5. Revisar estado, duración, respuesta y tamaño.
6. Abrir `/pedido`.
7. Enviar un pedido válido.
8. Revisar el `POST` a JSONPlaceholder.
9. Volver al catálogo y comprobar el cleanup de la petición.
10. Comparar los datos de DevTools con el panel flotante.

## Uso permitido de IA

La IA se utilizó como apoyo para:

- Depurar dependencias de `useEffect`.
- Explicar `AbortController`.
- Revisar el manejo de errores de Axios.
- Resolver errores de compilación.
- Mejorar estilos y responsive.
- Revisar estados de carga, éxito y error.

La integración de componentes, props, formularios y renderizado se realizó
manualmente dentro del proyecto.

Ejemplo de comentario utilizado para documentar apoyo de IA:

```jsx
// IA: StrictMode podía iniciar dos efectos en desarrollo.
// Solución manual: AbortController cancela la petición anterior durante cleanup.
```

No se modificaron estados manualmente para saltar la lógica de carga o error y
se conservaron los fallbacks de red.

## Evidencias del ejercicio

Agregar las capturas reales en `docs/evidencias/`:

```text
docs/evidencias/
├── 01-instalacion.png
├── 02-estructura.png
├── 03-routing.png
├── 04-api.png
├── 05-catalogo.png
├── 06-formulario.png
├── 07-network.png
└── 08-panel-auditoria.png
```

### Capturas requeridas

1. Terminal con creación e instalación del proyecto.
2. Explorador de VS Code mostrando `pages`, `components`, `services` y `hooks`.
3. Código de `BrowserRouter`, `Routes`, `Route` y `NavLink`.
4. Código de Axios, `useEffect`, `async/await` y `AbortController`.
5. Catálogo con tarjetas, búsqueda y filtros.
6. Formulario con validaciones.
7. DevTools Network mostrando `GET` y `POST`.
8. Panel flotante con IP, velocidad, latencia y solicitudes.

Las imágenes de evidencia deben ser capturas propias del proyecto local. No se
deben presentar capturas de ejemplo como si fueran resultados reales.

## GitHub

Reemplazar este enlace por el repositorio real:

```text
https://github.com/TU-USUARIO/TU-REPOSITORIO
```

[Repositorio del proyecto](https://github.com/TU-USUARIO/TU-REPOSITORIO)

El repositorio debe incluir el código fuente y este `README.md`.

## Comandos de verificación

```bash
npm run lint
npm run build
```

Resultado:

- Lint: correcto.
- Build de producción: correcto.
- Routing SPA: implementado.
- Consumo Axios: implementado.
- Estados `loading`, `data`, `error`: implementados.
- `AbortController`: implementado.
- Formulario controlado: implementado.
- Keys estables: implementadas.
- Auditoría de red: implementada.
