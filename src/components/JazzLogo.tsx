export default function JazzLogo({ size = 32 }: { size?: number }) {
  return (
    <img
      src="/logo.svg"
      alt="38 Riv Jazz Club"
      style={{ width: size, height: size, borderRadius: '50%' }}
    />
  )
}
