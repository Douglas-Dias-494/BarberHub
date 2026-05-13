import { Link } from 'react-router-dom'

export default function BarberCard({ shop }) {

  console.log("Propriedades recebidas no Card de:", shop.name, shop);
  
  return (
    <div
      className="card fade-in"
      style={{
        overflow: 'hidden',
        position: 'relative'
      }}
    >

      {/* Banner */}
      <div style={{
        height: 180,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        marginBottom: 20,
        background: 'linear-gradient(135deg, #1a1a1a, #0f0f0f)',
        border: '1px solid var(--border)',
      }}>
        <img
          src={shop.image || 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1200'}
          alt={shop.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.88
          }}
        />
      </div>

      {/* Status */}
      <div style={{
        position: 'absolute',
        top: 40,
        left: 40
      }}>
        <span className={`badge ${shop.open ? 'badge-success' : 'badge-error'}`}>
          {shop.open ? 'Aberto' : 'Fechado'}
        </span>
      </div>

      {/* Content */}
      <div>

        <div className="gold-line" />

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 26,
          marginBottom: 6
        }}>
          {shop.name}
        </h2>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 14,
          marginBottom: 16
        }}>
          {shop.address}
        </p>

        {/* Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          marginBottom: 20
        }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 14
          }}>
            <span style={{ color: 'var(--text-muted)' }}>
              Funcionamento
            </span>

            <span>
              {shop.openHour} - {shop.closeHour}
            </span>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 14
          }}>
            <span style={{ color: 'var(--text-muted)' }}>
              Distância
            </span>

            <span style={{ color: 'var(--gold)' }}>
              {shop.distance} km
            </span>
          </div>

        </div>

        {/* Actions */}
        <div style={{
          display: 'flex',
          gap: 12
        }}>

          <Link
            to={`/barbershop/${shop.id}`}
            className="btn btn-primary"
            style={{ flex: 1 }}
          >
            Ver Loja
          </Link>

          <button className="btn btn-outline">
            ♡
          </button>

        </div>

      </div>
    </div>
  )
}