import BarberLayout from '../../layouts/BarberLayout'

export default function Dashboard() {

  const stats = [
    {
      label: 'Agendamentos Hoje',
      value: 12,
      icon: '📅'
    },
    {
      label: 'Clientes do Mês',
      value: 84,
      icon: '👥'
    },
    {
      label: 'Faturamento',
      value: 'R$ 4.250',
      icon: '💰'
    },
    {
      label: 'Serviços',
      value: 16,
      icon: '✂'
    }
  ]

  const recentAppointments = [
    {
      id: 1,
      client: 'Douglas Moraes',
      service: 'Corte + Barba',
      hour: '14:30'
    },
    {
      id: 2,
      client: 'Carlos Henrique',
      service: 'Degradê',
      hour: '15:00'
    },
    {
      id: 3,
      client: 'João Pedro',
      service: 'Barba',
      hour: '16:00'
    }
  ]

  return (
    <BarberLayout>

      <div className="container">

        {/* Header */}
        <div className="page-header fade-in">

          <div className="gold-line" />

          <h1 className="page-title">
            Dashboard
          </h1>

          <p className="page-subtitle">
            Bem-vindo de volta ao BarberHub.
          </p>

        </div>

        {/* Stats */}
        <div className="grid-4" style={{ marginBottom: 28 }}>

          {stats.map((item, index) => (

            <div
              key={index}
              className="card fade-in"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12
              }}
            >

              <div style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-md)',
                background: 'var(--gold-dim)',
                border: '1px solid rgba(201,168,76,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24
              }}>
                {item.icon}
              </div>

              <div>

                <div style={{
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  marginBottom: 6
                }}>
                  {item.label}
                </div>

                <div style={{
                  fontSize: 30,
                  fontWeight: 700,
                  color: 'var(--text-primary)'
                }}>
                  {item.value}
                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Recent Appointments */}
        <div
          className="card fade-in"
        >

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24
          }}>

            <div>

              <h2 style={{
                fontSize: 24,
                marginBottom: 6
              }}>
                Próximos Agendamentos
              </h2>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 14
              }}>
                Clientes agendados para hoje.
              </p>

            </div>

            <button className="btn btn-outline">
              Ver Agenda
            </button>

          </div>

          {/* List */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16
          }}>

            {recentAppointments.map(item => (

              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 18,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)'
                }}
              >

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14
                }}>

                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'var(--gold-dim)',
                    color: 'var(--gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700
                  }}>
                    {item.client.charAt(0)}
                  </div>

                  <div>

                    <div style={{
                      fontWeight: 600,
                      marginBottom: 4
                    }}>
                      {item.client}
                    </div>

                    <div style={{
                      fontSize: 14,
                      color: 'var(--text-secondary)'
                    }}>
                      {item.service}
                    </div>

                  </div>

                </div>

                <div className="badge badge-gold">
                  {item.hour}
                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </BarberLayout>
  )
}