// Shows a real photo when one is provided, otherwise a pretty placeholder.
// Photos live in /src/asset and are matched to a label automatically in App.jsx.
export default function ImagePlaceholder({ label, src, className = '' }) {
  if (src) {
    return <img src={src} alt={label} className={`img-real ${className}`} />
  }
  return (
    <div className={`img-placeholder ${className}`} role="img" aria-label={label}>
      <span className="ph-heart">💛</span>
      <span className="ph-label">{label}</span>
      <span className="ph-hint">your photo here</span>
    </div>
  )
}
