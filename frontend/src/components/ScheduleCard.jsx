export default function ScheduleCard({
  schedule,
  selected,
  unavailable,
  onSelect
}) {

  return (
    <button
      onClick={() => !unavailable && onSelect(schedule)}
      disabled={unavailable}
      style={{
        width: '100%',
        padding: 18,
        borderRadius: 'var(--radius-md)',
        border: selected
          ? '1px solid var(--gold)'
          : '1px solid var(--border)',

        background: unavailable
          ? 'rgba(224,82,82,0.08)'
          : selected
            ? 'var(--gold-dim)'
            : 'var(--bg-card)',

        color: unavailable
          ? 'var(--text-muted)'
          : selected
            ? 'var(--gold)'
            : 'var(--text-primary)',

        transition: 'var(--transition)',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,

        cursor: unavailable ? 'not-allowed' : 'pointer'
      }}
    >

      {/* Hour */}
      <span style={{
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '-0.5px'
      }}>
        {schedule.hour}
      </span>

      {/* Status */}
      <span className={`badge ${
        unavailable
          ? 'badge-error'
          : selected
            ? 'badge-gold'
            : 'badge-success'
      }`}>
        {
          unavailable
            ? 'Ocupado'
            : selected
              ? 'Selecionado'
              : 'Disponível'
        }
      </span>

    </button>
  )
}