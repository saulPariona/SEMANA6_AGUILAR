import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, BadgeCheck, Cake, CakeSlice, ChefHat, ChevronLeft, ChevronRight,
  Clock3, Heart, Mail, MapPin, Phone, Sparkles, Star, Truck,
} from 'lucide-react'
import Section from '../components/Section'
import s from '../styles/ui.module.css'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
    alt: 'Torta decorada de chocolate',
    eyebrow: 'Tu celebración empieza aquí',
    title: 'Un detalle dulce que se vuelve recuerdo',
    text: 'Diseñamos tortas y postres hechos a mano para que cada momento tenga un sabor especial.',
  },
  {
    image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1200&q=85',
    alt: 'Pastel artesanal con decoración',
    eyebrow: 'Creaciones a tu medida',
    title: 'Tu idea, nuestra inspiración',
    text: 'Elige el sabor, el tamaño y la decoración. Nosotros convertimos tu idea en una creación deliciosa.',
  },
  {
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e2e4f3f5?auto=format&fit=crop&w=1200&q=85',
    alt: 'Pastel decorado con crema',
    eyebrow: 'Calidad en cada bocado',
    title: 'Horneado fresco para compartir',
    text: 'Trabajamos con ingredientes seleccionados y mucho cariño para entregar una experiencia inolvidable.',
  },
]

const fallbackImage = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85'

const gallery = [
  { image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85', alt: 'Torta de chocolate decorada', label: 'Tortas de celebración' },
  { image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=85', alt: 'Cupcake artesanal', label: 'Detalles dulces' },
  { image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85', alt: 'Pastel con frutas', label: 'Sabores frescos' },
  { image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85', alt: 'Interior acogedor de una pastelería', label: 'Nuestro espacio' },
  { image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=85', alt: 'Interior de local gastronómico', label: 'Un lugar para compartir' },
  { image: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=85', alt: 'Postre de chocolate', label: 'Hecho con cariño' },
]

const features = [
  { id: 'f1', icon: ChefHat, title: 'Hecho a mano', text: 'Cada torta se hornea al día con ingredientes frescos.' },
  { id: 'f2', icon: Truck, title: 'Entrega coordinada', text: 'Llevamos tu pedido a tiempo en Huancayo y alrededores.' },
  { id: 'f3', icon: BadgeCheck, title: 'Calidad garantizada', text: 'Cuidamos cada detalle para que celebres sin preocupaciones.' },
  { id: 'f4', icon: Sparkles, title: 'A tu medida', text: 'Personalizamos sabores, tamaños y decoración.' },
]

const steps = [
  { number: '01', title: 'Cuéntanos tu idea', text: 'Completa el formulario con la fecha, cantidad y detalles.' },
  { number: '02', title: 'Diseñamos contigo', text: 'Te orientamos para elegir la combinación ideal.' },
  { number: '03', title: 'Disfruta tu pedido', text: 'Preparamos y coordinamos una entrega segura y puntual.' },
]

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0)
  const slide = slides[activeSlide]
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [])

  const moveSlide = (direction) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length)
  }

  return (
    <>
      <section className={s.hero}>
        <div className={`${s.container} ${s.heroInner}`}>
          <div className={s.heroCopy}>
            <img className={s.heroLogo} src="/logo.webp" alt="Logo Dulce Morado" />
            <span className={s.eyebrow}><Sparkles size={14} /> Pastelería artesanal</span>
            <h1 className={s.heroTitle}>Tortas y pasteles con <span>sabor a celebración</span></h1>
            <p className={s.heroText}>Creamos postres únicos para cumpleaños, bodas, aniversarios o simplemente para endulzar tu día.</p>
            <div className={s.heroBtns}>
              <Link to="/catalogo" className={s.btn}>Ver catálogo <ArrowRight size={18} /></Link>
              <Link to="/pedido" className={`${s.btn} ${s.btnGhost}`}>Hacer pedido</Link>
            </div>
            <div className={s.heroTrust}><span><Star size={16} /> Atención personalizada</span><span><Heart size={16} /> Hecho con cariño</span></div>
          </div>
          <div className={s.heroVisual}>
            <div className={s.heroPhotoFrame}>
              <img src={slide.image} alt={slide.alt} className={s.heroPhoto} key={slide.image} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} />
              <span className={s.photoTag}><Cake size={16} /> Recién horneado</span>
            </div>
            <div className={s.floatingBadge}><Heart size={18} fill="currentColor" /> Hecho especialmente para ti</div>
          </div>
        </div>
      </section>

      <section className={s.carouselSection} aria-label="Propuesta de Dulce Morado">
        <div className={`${s.container} ${s.carousel}`}>
          <div className={s.carouselContent} key={activeSlide}>
            <span className={s.eyebrow}>{slide.eyebrow}</span>
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>
            <Link to="/pedido" className={s.textLink}>Personalizar mi pedido <ArrowRight size={17} /></Link>
          </div>
          <div className={s.carouselVisual} key={`visual-${activeSlide}`}>
            <img src={slide.image} alt={slide.alt} className={s.carouselPhoto} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} />
            <span>0{activeSlide + 1} / 0{slides.length}</span>
          </div>
          <div className={s.carouselControls}>
            <button className={s.carouselBtn} onClick={() => moveSlide(-1)} aria-label="Anterior"><ChevronLeft size={20} /></button>
            <div className={s.dots}>{slides.map((item, index) => <button key={item.eyebrow} className={index === activeSlide ? s.dotActive : s.dot} onClick={() => setActiveSlide(index)} aria-label={`Ver diapositiva ${index + 1}`} />)}</div>
            <button className={s.carouselBtn} onClick={() => moveSlide(1)} aria-label="Siguiente"><ChevronRight size={20} /></button>
          </div>
        </div>
      </section>

      <Section title="¿Por qué elegirnos?" subtitle="Una experiencia cuidada desde el primer mensaje hasta el último bocado." icon={BadgeCheck}>
        <div className={s.features}>{features.map(({ id, icon: Icon, title, text }) => <div key={id} className={s.feature}><Icon size={30} /><h3>{title}</h3><p>{text}</p></div>)}</div>
      </Section>

      <section className={s.gallerySection}>
        <div className={s.container}>
          <div className={s.sectionHead}><span className={s.sectionIcon}><CakeSlice size={22} /></span><h2>Conoce nuestro mundo dulce</h2></div>
          <p className={s.sectionSub}>Una muestra de nuestras creaciones y del ambiente donde preparamos cada pedido.</p>
          <div className={s.galleryGrid}>
            {gallery.map((item) => (
              <figure className={s.galleryItem} key={item.image}>
                <img src={item.image} alt={item.alt} loading="lazy" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} />
                <figcaption>{item.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className={s.visionSection}>
        <div className={`${s.container} ${s.visionGrid}`}>
          <div className={s.visionIntro}><span className={s.eyebrow}>Nuestra esencia</span><h2>Más que postres, creamos momentos para compartir.</h2><p>En Dulce Morado creemos que una celebración se recuerda por cómo nos hizo sentir. Por eso ponemos creatividad, sabor y dedicación en cada pedido.</p></div>
          <article className={s.visionCard}><span className={s.visionIcon}><Sparkles size={25} /></span><h3>Visión</h3><p>Ser la pastelería artesanal referente de nuestra comunidad, reconocida por crear experiencias dulces, cercanas y memorables.</p></article>
          <article className={s.visionCard}><span className={s.visionIcon}><Heart size={25} /></span><h3>Misión</h3><p>Endulzar los momentos importantes de nuestros clientes con productos frescos, atención cálida y diseños hechos a su medida.</p></article>
        </div>
      </section>

      <Section title="Así hacemos realidad tu idea" subtitle="Un proceso simple, cercano y pensado para que disfrutes desde el primer momento." icon={Clock3}>
        <div className={s.steps}>{steps.map((step) => <article className={s.step} key={step.number}><span className={s.stepNumber}>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </Section>

      <section className={s.contactSection}>
        <div className={`${s.container} ${s.contactCard}`}>
          <div><span className={s.eyebrow}>¿Tienes una idea?</span><h2>Hablemos de tu próxima celebración</h2><p>Estamos listos para ayudarte a crear un postre memorable.</p></div>
          <div className={s.contactActions}><a href="tel:+51923791008"><Phone size={18} /> 923 791 008</a><a href="mailto:sparionaramos7601@gmail.com"><Mail size={18} /> sparionaramos7601@gmail.com</a><span><MapPin size={18} /> Huancayo, Junín</span><Link to="/pedido" className={s.btn}>Solicitar pedido <ArrowRight size={18} /></Link></div>
        </div>
      </section>
    </>
  )
}
