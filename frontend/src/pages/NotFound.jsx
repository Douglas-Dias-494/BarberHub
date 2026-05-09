import { Link } from 'react-router-dom'

export default function NotFound() {

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }}>

      <div
        className="card fade-in"
        style={{
          maxWidth: 620,
          width: '100%',
          textAlign: 'center',
          padding: 60
        }}
      >

        {/* Code */}
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 120,
          lineHeight: 1,
          color: 'var(--gold)',
          marginBottom: 20,
          opacity: 0.9
        }}>
          404
        </div>

        <div className="gold-line" style={{
          margin: '0 auto 20px'
        }} />

        {/* Title */}
        <h1 style={{
          fontSize: 36,
          marginBottom: 14
        }}>
          Página não encontrada
        </h1>

        {/* Description */}
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: 16,
          lineHeight: 1.8,
          maxWidth: 420,
          margin: '0 auto 36px'
        }}>
          A página que você está procurando
          não existe ou foi removida.
        </p>

        {/* Actions */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          flexWrap: 'wrap'
        }}>

          <Link
            to="/"
            className="btn btn-primary btn-lg"
          >
            Voltar ao Início
          </Link>

          <button
            className="btn btn-outline btn-lg"
            onClick={() => window.history.back()}
          >
            Página Anterior
          </button>

        </div>

      </div>

    </div>
  )
}