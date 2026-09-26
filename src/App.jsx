import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Asterisk, Check, Instagram, Menu, MoveUpRight, Play, Sparkles, X } from 'lucide-react'

const services = [
  {
    number: '01',
    title: 'Brand activations',
    category: 'MAKE SOME NOISE',
    text: 'We turn brand stories into real-world moments people want to be part of.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=85',
    icon: '✳',
  },
  {
    number: '02',
    title: 'Event experiences',
    category: 'BRING PEOPLE TOGETHER',
    text: 'From first spark to final encore, we make every detail feel unforgettable.',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=85',
    icon: '↗',
  },
  {
    number: '03',
    title: 'Talent & creators',
    category: 'CULTURE, CONNECTED',
    text: 'The right voices, the right energy, and collaborations that feel like a fit.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85',
    icon: '✺',
  },
]
const GoldOrb = lazy(() => import('./GoldOrb.jsx'))
const assetUrl = (path) => `${import.meta.env.BASE_URL}${path}`

const reviews = [
  { title: 'They just get it.', text: 'The team took our half-formed idea and built an experience that felt completely, unmistakably us.', name: 'Ananya Mehta', role: 'Marketing Lead, Goodwell', avatar: 'photo-1534528741775-53994a69daeb', place: 'review-one' },
  { title: 'A team that makes magic.', text: 'Every moving part felt effortless. Our community is still talking about that night.', name: 'Rohan Shah', role: 'Founder, Common Ground', avatar: 'photo-1500648767791-00dcc994a43e', place: 'review-two' },
  { title: 'Better than we imagined.', text: 'They brought the right people into the room and gave our launch a life of its own.', name: 'Mira Kapoor', role: 'Brand Director, Serein', avatar: 'photo-1531123897727-8f129e1688ce', place: 'review-three' },
  { title: 'The best kind of partners.', text: 'Thoughtful, ambitious, and genuinely invested in getting the details right.', name: 'Dev Malhotra', role: 'Community, Unfold', avatar: 'photo-1506794778202-cad84cf45f1d', place: 'review-four' },
]

const creatorFields = [
  ['Full name', 'text', 'Your name'],
  ['Email address', 'email', 'you@example.com'],
  ['Phone number', 'tel', '+91 00000 00000'],
  ['City', 'text', 'Where you create'],
  ['Instagram handle', 'text', '@yourhandle'],
  ['Primary platform', 'select', 'Choose a platform'],
  ['Profile link', 'url', 'https://'],
  ['Audience size', 'select', 'Select a range'],
  ['Content category', 'select', 'Choose your niche'],
  ['Your audience', 'text', 'Who do you speak to?'],
  ['Past brand collaborations', 'textarea', 'Tell us a little about them'],
  ['What makes your work different?', 'textarea', 'A few words about your creative POV'],
  ['How did you hear about us?', 'select', 'Choose one'],
]

function Eyebrow({ children, light = false }) {
  return <div className={`eyebrow ${light ? 'eyebrow-light' : ''}`}><span />{children}</div>
}

function Reveal({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  )
}

function DeferredOrb() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const [desktop, setDesktop] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(min-width: 681px)')
    const update = () => setDesktop(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (!desktop || !ref.current) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { rootMargin: '150px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [desktop])
  return <div className="orb-canvas" ref={ref}>{visible && <Suspense fallback={null}><GoldOrb /></Suspense>}</div>
}

function WorldMap() {
  return (
    <div className="map-visual" aria-label="Bardapure connects creators and partners around the world">
      <svg viewBox="0 0 600 260" role="img" aria-hidden="true">
        <defs>
          <pattern id="mapDots" width="9" height="9" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.45" fill="#a4a5a7" />
          </pattern>
          <linearGradient id="mapFade" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#181818" stopOpacity="1" />
            <stop offset="34%" stopColor="#181818" stopOpacity="0" />
          </linearGradient>
          <mask id="continents">
            <rect width="600" height="260" fill="black" />
            <path fill="white" d="M60 72 83 51l43-16 36 9 22 21-4 18-20 7-11 22-19 5-8 26-22 17-17-12-9-28-21-10-13-23-18-2z M169 155l28 4 25 25 12 37-13 31-17-12-10-36-20-19z M254 65l22-19 33 2 11 15-12 11-24-4-7 16-19 4-13 22-19-7 3-20z M288 111l37-21 48 8 24 23-9 31-28 8-8 25-27 14-15-17-28-1-15-26 10-22z M377 62l28-19 47 3 36 20-7 19-32 2-16 17-29-4-18-16-26 1-5-12z M435 149l21-10 30 11 14 24-14 22-28-3-19-16z" />
          </mask>
        </defs>
        <rect width="600" height="260" fill="url(#mapDots)" mask="url(#continents)" opacity=".7" />
        <rect width="600" height="260" fill="url(#mapFade)" />
      </svg>
      <div className="map-pin pin-india"><span>🇮🇳</span></div>
      <div className="map-pin pin-london"><span>🎨</span></div>
      <div className="map-pin pin-ny"><span>🎬</span></div>
      <div className="map-label label-india">MUMBAI</div>
    </div>
  )
}

function ImpactCard() {
  return (
    <Reveal className="impact-card">
      <div className="impact-copy">
        <span className="impact-index">OUR WORLD, A LITTLE CLOSER</span>
        <h3>Local energy.<br /><em>Worldwide reach.</em></h3>
        <p>Rooted in India and always looking outward. We bring the right people together, wherever the story takes us.</p>
      </div>
      <WorldMap />
    </Reveal>
  )
}

function Counter({ value, suffix = '', label }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0 })
  const rounded = useTransform(spring, (latest) => Math.round(latest).toLocaleString())
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (inView) motionValue.set(value)
  }, [inView, motionValue, value])
  useEffect(() => rounded.on('change', (latest) => setDisplay(latest)), [rounded])
  return <div className="metric" ref={ref}><div><span>{display}</span><i>{suffix}</i></div><p>{label}</p></div>
}

function ReviewCard({ review, index }) {
  return (
    <motion.article
      className={`review-card ${review.place}`}
      initial={{ opacity: 0, y: 24, rotate: index % 2 ? 2 : -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay: index * 0.09 }}
      whileHover={{ y: -5, rotate: index % 2 ? 1 : -1 }}
    >
      <div className="review-stars" aria-label="5 out of 5 stars">★★★★★ <span>5.0</span></div>
      <h3>{review.title}</h3>
      <p>{review.text}</p>
      <div className="review-author">
        <img src={`https://images.unsplash.com/${review.avatar}?auto=format&fit=crop&w=96&h=96&q=80`} alt="" loading="lazy" />
        <div><strong>{review.name}</strong><span>{review.role}</span></div>
      </div>
    </motion.article>
  )
}

function ComingSoonDialog({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="dialog-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <motion.div className="coming-dialog" role="dialog" aria-modal="true" aria-labelledby="dialog-title" initial={{ opacity: 0, scale: 0.94, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
        <button className="dialog-close" onClick={onClose} aria-label="Close dialog"><X size={20} /></button>
        <span className="dialog-icon"><Sparkles size={22} /></span>
        <Eyebrow>GOOD THINGS ARE BREWING</Eyebrow>
        <h2 id="dialog-title">Your next chapter<br /><em>starts soon.</em></h2>
        <p>This portal is getting its final touches. Leave us a note at <a href="mailto:hello@bardapure.com">hello@bardapure.com</a> and our team will be in touch.</p>
        <button className="button button-gold" onClick={onClose}>Sounds good <Check size={16} /></button>
      </motion.div>
    </div>
  )
}

function RegistrationForm({ onSubmit }) {
  return (
    <form className="registration-form" onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
      <div className="form-grid">
        {creatorFields.map(([label, type, placeholder], index) => (
          <label className={type === 'textarea' ? 'field field-wide' : 'field'} key={label}>
            <span>{String(index + 1).padStart(2, '0')} &nbsp; {label}</span>
            {type === 'textarea' ? <textarea placeholder={placeholder} rows="3" /> : type === 'select' ? (
              <select defaultValue="">
                <option value="" disabled>{placeholder}</option>
                {(index === 5 ? ['Instagram', 'YouTube', 'TikTok', 'Other'] : index === 7 ? ['Under 10k', '10k–50k', '50k–250k', '250k+'] : index === 8 ? ['Fashion', 'Lifestyle', 'Food', 'Music', 'Art & design', 'Other'] : ['Social media', 'A friend', 'An event', 'Other']).map((option) => <option key={option}>{option}</option>)}
              </select>
            ) : <input type={type} placeholder={placeholder} />}
          </label>
        ))}
      </div>
      <button className="button button-gold form-submit" type="submit">Send my details <ArrowRight size={16} /></button>
      <p className="form-note">By submitting, you agree to hear from our team. Your details stay with us.</p>
    </form>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [formMode, setFormMode] = useState('creator')
  const [scrollProgress, setScrollProgress] = useState(0)
  const closeDialog = () => setDialogOpen(false)

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? window.scrollY / scrollable : 0)
    }
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  const navLinks = [['The story', '#story'], ['What we do', '#services'], ['The love', '#love'], ['Say hello', '#contact']]

  return (
    <main>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress})` }} />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Bardapure Productions home">
          <img src={assetUrl('bardapurelogo.png')} alt="Bardapure Productions" />
          <span>BARDAPURE<br /><small>PRODUCTIONS</small></span>
        </a>
        <nav className={menuOpen ? 'nav-open' : ''} aria-label="Main navigation">
          {navLinks.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
          <a className="nav-cta" href="#contact">Let’s create <ArrowUpRight size={15} /></a>
        </nav>
        <button className="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <section className="hero" id="top">
        <video className="hero-video" autoPlay muted loop playsInline preload="none" poster="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=2200&q=85" aria-label="Concert crowd celebrating beneath the lights">
          <source src="https://videos.pexels.com/video-files/3130284/3130284-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
            <Eyebrow light>INDEPENDENT CREATIVE COLLECTIVE · INDIA</Eyebrow>
            <h1>Explore Your<br /><span>Ambitions</span></h1>
            <p>We make culture move. Bringing creators, brands, and the next big idea into the same room.</p>
            <div className="hero-actions">
              <a className="button button-gold" href="#story">Discover our world <ArrowDown size={16} /></a>
              <a className="play-link" href="#services"><span><Play size={14} fill="currentColor" /></span> See what we make</a>
            </div>
          </motion.div>
          <div className="hero-aside"><span>GOOD IDEAS<br />DON’T SIT STILL</span><Asterisk size={22} /></div>
        </div>
        <div className="hero-foot"><span>SCROLL TO EXPLORE</span><span className="hero-line" /><span>19°04′ N &nbsp; 72°52′ E</span></div>
        <span className="hero-outline" aria-hidden="true">BP—01</span>
      </section>

      <section className="intro section-pad" id="story">
        <div className="intro-top">
          <Reveal><Eyebrow>WE’RE BARDAPURE</Eyebrow><h2>Not just a production house.<br /><em>A culture in motion.</em></h2></Reveal>
          <Reveal delay={0.12} className="intro-right"><p>We’re a creative ecosystem built around one belief: the best things happen when people who care come together.</p><a className="text-link" href="#contact">Meet your new people <ArrowUpRight size={16} /></a></Reveal>
        </div>
        <div className="intro-bottom">
          <div className="intro-image">
            <img src={assetUrl('founder01.jpeg')} alt="Bardapure Productions founder at a live event" loading="lazy" />
            <span className="image-caption"><i /> MADE WITH HEART, ALWAYS.</span>
            <div className="image-stamp">B<br /><small>P</small></div>
          </div>
          <div className="intro-story">
            <div className="story-marker"><span>THE SHORT VERSION</span><span>01 / 04</span></div>
            <h3>We believe in the<br />power of <em>showing up.</em></h3>
            <p>For creators who want to go further. For brands who want to mean more. For moments that deserve a little extra magic.</p>
            <p>From a college campus to a city-wide celebration, we build the connections and make the kind of memories that stick around.</p>
            <div className="story-signoff">That’s the Bardapure way. <Asterisk size={17} /></div>
          </div>
          <ImpactCard />
        </div>
      </section>

      <section className="services section-pad" id="services">
        <div className="section-heading">
          <Reveal><Eyebrow>THE THINGS WE DO</Eyebrow><h2>Big energy.<br /><em>Even better execution.</em></h2></Reveal>
          <Reveal delay={0.1}><p>One idea or the whole show, we bring the right minds and the right magic to make it happen.</p></Reveal>
        </div>
        <div className="service-grid">
          {services.map((service, index) => (
            <Reveal key={service.number} delay={index * 0.12} className={`service-card service-${index + 1}`}>
              <div className="service-image" style={{ backgroundImage: `url("${service.image}")` }} />
              <div className="service-image-shade" />
              <div className="service-top"><span>{service.number} / 03</span><span>{service.category}</span></div>
              {index === 1 && <DeferredOrb />}
              <span className="service-symbol" aria-hidden="true">{service.icon}</span>
              <div className="service-copy"><h3>{service.title}</h3><p>{service.text}</p><a href="#contact" aria-label={`Ask us about ${service.title}`}><ArrowUpRight size={20} /></a></div>
            </Reveal>
          ))}
        </div>
        <div className="services-note"><span>THOUGHTFULLY BUILT FROM THE GROUND UP</span><span>IDEA&nbsp; → &nbsp;IMPACT</span></div>
      </section>

      <section className="proof section-pad" id="proof">
        <div className="proof-top">
          <Reveal><Eyebrow>OUR PEOPLE ARE OUR POWER</Eyebrow><h2>Small world.<br /><em>Huge possibility.</em></h2></Reveal>
          <Reveal className="proof-copy" delay={0.12}><p>Every great thing starts with a connection. We’ve spent years finding the people who make the right things happen.</p><a className="text-link" href="#contact">Find your people <ArrowUpRight size={16} /></a></Reveal>
        </div>
        <div className="metrics">
          <Counter value={10000} suffix="+" label="creators & influencers in our network" />
          <span className="metric-cross"><Asterisk /></span>
          <Counter value={150} suffix="+" label="college partnerships and counting" />
          <span className="metric-cross metric-cross-last"><Asterisk /></span>
          <div className="metric-aside"><span>THE GOOD<br />COMPANY</span><span>EST. 2018<br />INDIA, EVERYWHERE</span></div>
        </div>
        <ImpactCard />
      </section>

      <section className="love section-pad" id="love">
        <div className="love-header"><Reveal><Eyebrow>GOOD WORDS, REAL PEOPLE</Eyebrow><h2>Better together.<br /><em>Always.</em></h2></Reveal><div className="love-mark">“</div></div>
        <div className="testimonial-canvas">
          <div className="dot-grid" aria-hidden="true" />
          <div className="review-core">
            <div className="review-kicker"><span /> THE WORD ON THE STREET</div>
            <h2>Loved by thousands<br />of <em>happy customers.</em></h2>
            <p>Hear from our community of builders, designers, and creators who trust us to power their projects.</p>
            <a className="button button-blue" href="#contact">Read all reviews <ArrowRight size={16} /></a>
          </div>
          <div className="review-track">
            {reviews.map((review, index) => <ReviewCard review={review} index={index} key={review.name} />)}
          </div>
          <div className="review-decoration">★★★★★<br /><span>REAL LOVE, REAL LOUD</span></div>
        </div>
      </section>

      <section className="join section-pad" id="contact">
        <div className="join-top">
          <Reveal><Eyebrow>YOUR NEXT CHAPTER STARTS HERE</Eyebrow><h2>Come make<br /><em>something matter.</em></h2></Reveal>
          <Reveal delay={0.12} className="join-intro"><p>There’s more than one way to be part of the story. Find your door and let’s get to know each other.</p><div className="join-coordinate"><span>02 / 04</span><span>OPEN DOOR POLICY <Asterisk size={14} /></span></div></Reveal>
        </div>
        <div className="form-layout">
          <aside className="form-aside">
            <span className="form-aside-number">01—02</span>
            <h3>Good things<br />start with <em>hello.</em></h3>
            <p>Tell us what you’re dreaming up. We’ll bring the coffee, the questions, and a few ideas of our own.</p>
            <a href="mailto:hello@bardapure.com">hello@bardapure.com <ArrowUpRight size={15} /></a>
            <div className="form-asterisk"><Asterisk strokeWidth={1} /></div>
          </aside>
          <div className="form-panel">
            <div className="form-tabs" role="tablist" aria-label="Choose a contact portal">
              <button role="tab" aria-selected={formMode === 'creator'} className={formMode === 'creator' ? 'active' : ''} onClick={() => setFormMode('creator')}><span>01</span> I’m a creator</button>
              <button role="tab" aria-selected={formMode === 'brand'} className={formMode === 'brand' ? 'active' : ''} onClick={() => setFormMode('brand')}><span>02</span> I’m a brand</button>
            </div>
            {formMode === 'creator' ? <RegistrationForm onSubmit={() => setDialogOpen(true)} /> : (
              <form className="registration-form b2b-form" onSubmit={(event) => { event.preventDefault(); setDialogOpen(true) }}>
                <p className="b2b-intro">A big brief, a little question, or just a feeling? We’d love to hear about it.</p>
                <div className="form-grid">
                  <label className="field"><span>01 &nbsp; Your name</span><input required placeholder="The name we should know" /></label>
                  <label className="field"><span>02 &nbsp; Work email</span><input type="email" required placeholder="you@yourbrand.com" /></label>
                  <label className="field"><span>03 &nbsp; Brand / organisation</span><input required placeholder="Who are you here with?" /></label>
                  <label className="field"><span>04 &nbsp; What are you dreaming up?</span><select defaultValue=""><option value="" disabled>Choose a starting point</option><option>Brand activation</option><option>Event experience</option><option>Creator collaboration</option><option>Something else entirely</option></select></label>
                  <label className="field field-wide"><span>05 &nbsp; Tell us a little more</span><textarea rows="4" placeholder="The big idea, the tiny details, all of it..." /></label>
                </div>
                <button className="button button-gold form-submit" type="submit">Start a conversation <ArrowRight size={16} /></button>
                <p className="form-note">No pitch decks required. Just a good conversation.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="instagram-section section-pad">
        <div className="insta-heading"><div><Eyebrow>OUT THERE, MAKING THINGS</Eyebrow><h2>A little more <em>us.</em></h2></div><a className="text-link" href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram size={16} /> Follow along <ArrowUpRight size={16} /></a></div>
        <div className="instagram-grid">
          {[
            ['photo-1492684223066-81342ee5ff30', 'A room full of possibility.'],
            ['photo-1516280440614-37939bbacd81', 'The energy is always real.'],
            ['photo-1531058020387-3be344556be6', 'Making memories, together.'],
            ['photo-1506157786151-b8491531f063', 'Some nights just stay with you.'],
          ].map(([image, alt], index) => <a className="insta-tile" href="https://www.instagram.com/" target="_blank" rel="noreferrer" key={image} style={{ backgroundImage: `url("https://images.unsplash.com/${image}?auto=format&fit=crop&w=700&q=80")` }} aria-label={alt}><span><Instagram size={18} /> {index + 1} / 04</span></a>)}
        </div>
        <div className="instagram-note"><span>INSTAGRAM FEED PREVIEW</span><span>THE BEST BITS, OFF THE GRID <MoveUpRight size={12} /></span></div>
      </section>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="brand" href="#top"><img src={assetUrl('bardapurelogo.png')} alt="" /><span>BARDAPURE<br /><small>PRODUCTIONS</small></span></a>
            <p>Good people. Big feelings.<br />Things worth remembering.</p>
          </div>
          <div className="footer-closer"><span>HAVE A GOOD ONE IN MIND?</span><a href="mailto:hello@bardapure.com">Let’s talk <ArrowUpRight /></a></div>
        </div>
        <div className="footer-bottom"><span>© 2025 BARDAPURE PRODUCTIONS</span><span>MADE WITH FEELING IN INDIA <Asterisk size={13} /></span><a href="#top">BACK TO THE TOP ↑</a></div>
      </footer>

      <a className="whatsapp-float" href="https://wa.me/910000000000" target="_blank" rel="noreferrer" aria-label="Chat with Bardapure on WhatsApp"><span className="whatsapp-icon">✆</span><span>Let’s chat</span></a>
      <ComingSoonDialog open={dialogOpen} onClose={closeDialog} />
    </main>
  )
}
