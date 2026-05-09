
export default function Loading({ fullScreen = false, size = 'md', text = '' }) {
  const sizeMap = { sm: 20, md: 32, lg: 48 }
  const s = sizeMap[size]

  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <svg width={s} height={s} viewBox="0 0 32 32" fill="none"
        style={{ animation: 'spin 1s linear infinite' }}>
        <circle cx="16" cy="16" r="13" stroke="var(--border)" strokeWidth="3" />
        <path d="M16 3 A13 13 0 0 1 29 16" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      {text && <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{text}</p>}
    </div>
  )

  if (fullScreen) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        flexDirection: 'column',
        gap: 20
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 28,
          fontWeight: 700,
          color: 'var(--gold)',
          letterSpacing: '-0.5px'
        }}>
          BarberHub
        </div>
        {spinner}
      </div>
    )
  }

  return spinner
}