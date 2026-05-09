export default function ServiceCard({ service, onSelect }) {

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20
      }}
    >

      {/* Left */}
      <div>

        <div className="gold-line" />

        <h3 style={{
          fontSize: 20,
          fontWeight: 600,
          marginBottom: 6
        }}>
          {service.name}
        </h3>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 14,
          marginBottom: 14
        }}>
          {service.description}
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>

          <span className="badge badge-info">
            ⏱ {service.duration} min
          </span>

          <span className="badge badge-gold">
            R$ {service.price}
          </span>

        </div>

      </div>

      {/* Right */}
      <button
        className="btn btn-primary"
        onClick={() => onSelect(service)}
      >
        Agendar
      </button>

    </div>
  )
}