export default function JazzLogo({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/logo.png"
      alt="38 Riv Jazz Club"
      style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover' }}
      onError={(e) => {
        const el = e.currentTarget as HTMLImageElement
        el.style.display = 'none'
        const parent = el.parentElement
        if (parent && !parent.querySelector('.logo-fallback')) {
          const fb = document.createElement('div')
          fb.className = 'logo-fallback'
          fb.style.cssText = `width:${size}px;height:${size}px;border-radius:50%;background:#1A1A2E;display:flex;align-items:center;justify-content:center;font-size:${size * 0.5}px`
          fb.textContent = '🎷'
          parent.appendChild(fb)
        }
      }}
    />
  )
}
