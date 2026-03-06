export default function JazzLogo({ size = 32 }: { size?: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-xl"
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D4E 100%)',
      }}
    >
      <span style={{ fontSize: size * 0.6 }}>🎷</span>
    </div>
  )
}
