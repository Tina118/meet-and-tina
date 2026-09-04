import { useState } from 'react'
import FloatingHearts from './components/FloatingHearts.jsx'
import ImagePlaceholder from './components/ImagePlaceholder.jsx'

// 💛 Easy to edit: change these and the whole site updates
const NAMES = { one: 'Meet', two: 'Tina' }

// Auto-loads every photo in /src/asset and keys it by filename (no extension).
// Drop a new photo in that folder named to match a label below and it just appears.
const photoModules = import.meta.glob('./asset/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
  eager: true,
  import: 'default',
})
const PHOTOS = {}
for (const path in photoModules) {
  const name = path.split('/').pop().replace(/\.[^.]+$/, '')
  PHOTOS[name] = photoModules[path]
}

const STORY = [
  { title: 'The day we met', text: 'The moment everything quietly changed forever. 💫', img: 'the-day-we-met' },
  { title: 'Forever begins here', text: 'Every road we take, we take together — hand in hand. 🌟', img: 'first-adventure' },
  { title: 'Home is you', text: 'I found out that home was never a place — it was you. 🏡', img: 'home-is-you' },
]

const REASONS = [
  'The way you laugh at your own jokes 😄',
  'How you make ordinary days feel like magic ✨',
  'Your hugs that fix absolutely everything 🤗',
  'You always give me your time, and respect me and my opinions 🤍',
  'You make me want to be better, every day 💕',
  'Simply — because you are you 🌹',
]

const GALLERY = ['us-1', 'us-2', 'us-3', 'us-4', 'us-5', 'us-6']

export default function App() {
  const [said, setSaid] = useState(false)
  const [noPos, setNoPos] = useState({ x: 0, y: 0 })
  const [yesSize, setYesSize] = useState(1)

  const dodge = () => {
    const x = (Math.random() - 0.5) * 320
    const y = (Math.random() - 0.5) * 200
    setNoPos({ x, y })
    setYesSize((s) => Math.min(s + 0.12, 1.6))
  }

  return (
    <div className="app">
      <FloatingHearts />

      {/* ---------- HERO ---------- */}
      <header className="hero">
        <p className="eyebrow">A little something, made with all my heart</p>
        <h1 className="names">
          {NAMES.one} <span className="amp">&amp;</span> {NAMES.two}
        </h1>
        <p className="tagline">Two hearts. One forever. 💍</p>
        <a href="#question" className="cta">Scroll for a surprise 💌</a>
        <div className="scroll-hint">↓</div>
      </header>

      {/* ---------- OUR STORY ---------- */}
      <section className="section">
        <h2 className="section-title">Our Little Story</h2>
        <div className="timeline">
          {STORY.map((s, i) => (
            <div className={`t-item ${i % 2 ? 'right' : 'left'}`} key={s.img}>
              <ImagePlaceholder label={s.img} src={PHOTOS[s.img]} className="t-photo" />
              <div className="t-text">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- GALLERY ---------- */}
      <section className="section tint">
        <h2 className="section-title">Us, Being Us 📸</h2>
        <div className="gallery">
          {GALLERY.map((g, i) => (
            <ImagePlaceholder key={g} label={g} src={PHOTOS[g]} className={`g-photo tilt-${i % 3}`} />
          ))}
        </div>
      </section>

      {/* ---------- REASONS ---------- */}
      <section className="section">
        <h2 className="section-title">Reasons I Adore You</h2>
        <div className="reasons">
          {REASONS.map((r, i) => (
            <div className="reason-card" key={i}>
              <span className="reason-num">#{i + 1}</span>
              <p>{r}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- THE QUESTION ---------- */}
      <section className="section question" id="question">
        {!said ? (
          <>
            <ImagePlaceholder label="the-big-moment" src={PHOTOS['the-big-moment']} className="ring-photo" />
            <h2 className="big-q">
              {NAMES.one}, will you marry me? 💍
            </h2>
            <p className="section-sub">Take your time... (but the answer is yes 😉)</p>
            <div className="btn-row">
              <button
                className="yes-btn"
                style={{ transform: `scale(${yesSize})` }}
                onClick={() => setSaid(true)}
              >
                YES! 💛
              </button>
              <button
                className="no-btn"
                style={{ transform: `translate(${noPos.x}px, ${noPos.y}px)` }}
                onMouseEnter={dodge}
                onClick={dodge}
              >
                No
              </button>
            </div>
          </>
        ) : (
          <Celebration names={NAMES} />
        )}
      </section>

      <footer className="footer">
        <p>Made with 💛, endless love, and a few happy tears</p>
        <p className="sig">— forever yours, {NAMES.two}</p>
      </footer>
    </div>
  )
}

function Celebration({ names }) {
  const pieces = Array.from({ length: 40 })
  return (
    <div className="celebrate">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="confetti"
          style={{
            left: `${(i * 2.5) % 100}%`,
            animationDelay: `${(i % 10) * 0.15}s`,
            fontSize: `${12 + (i % 5) * 6}px`,
          }}
        >
          {['💛', '💍', '💕', '🎉', '🥂', '🌹'][i % 6]}
        </span>
      ))}
      <h2 className="big-q yay">He said YES!!! 🎉</h2>
      <p className="tagline">{names.one} &amp; {names.two} — engaged &amp; endlessly in love 💍</p>
      <ImagePlaceholder label="the-yes-moment" src={PHOTOS['the-yes-moment'] || PHOTOS['the-big-moment']} className="ring-photo" />
    </div>
  )
}
