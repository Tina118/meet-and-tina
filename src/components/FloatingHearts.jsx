// Gentle floating hearts drifting up the whole page. Purely decorative. 💕
const HEARTS = Array.from({ length: 18 })

export default function FloatingHearts() {
  return (
    <div className="hearts-bg" aria-hidden="true">
      {HEARTS.map((_, i) => (
        <span
          key={i}
          className="float-heart"
          style={{
            left: `${(i * 5.5) % 100}%`,
            fontSize: `${14 + (i % 5) * 8}px`,
            animationDuration: `${8 + (i % 6) * 2}s`,
            animationDelay: `${(i % 8) * 1.3}s`,
          }}
        >
          {['💛', '💕', '💗', '🤍', '💖'][i % 5]}
        </span>
      ))}
    </div>
  )
}
