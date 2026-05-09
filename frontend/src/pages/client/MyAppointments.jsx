import ClientLayout from '../../layouts/ClientLayout'

export default function MyAppointments() {

  const appointments = [
    {
      id: 1,
      barber: 'BarberHub Premium',
      service: 'Corte Degradê',
      date: '08/05/2026',
      hour: '14:30',
      status: 'Confirmado'
    },
    {
      id: 2,
      barber: 'Elite Barber',
      service: 'Barba',
      date: '12/05/2026',
      hour: '16:00',
      status: 'Pendente'
    }
  ]

  return (
    <ClientLayout>

      <div className="container">

        <div className="page-header fade-in">

          <div className="gold-line" />

          <h1 className="page-title">
            Meus Agendamentos
          </h1>

          <p className="page-subtitle">
            Acompanhe seus horários marcados.
          </p>

        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}>

          {appointments.map(item => (

            <div
              key={item.id}
              className="card fade-in"
            >

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 24
              }}>

                <div>

                  <div className="gold-line" />

                  <h2 style={{
                    fontSize: 24,
                    marginBottom: 6
                  }}>
                    {item.barber}
                  </h2>

                  <p style={{
                    color: 'var(--text-secondary)'
                  }}>
                    {item.service}
                  </p>

                </div>

                <span className={`badge ${
                  item.status === 'Confirmado'
                    ? 'badge-success'
                    : 'badge-warning'
                }`}>
                  {item.status}
                </span>

              </div>

              <div className="grid-2">

                <div style={{
                  padding: 18,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)'
                }}>

                  <div style={{
                    color: 'var(--text-muted)',
                    fontSize: 13,
                    marginBottom: 6
                  }}>
                    Data
                  </div>

                  <div style={{
                    fontWeight: 600
                  }}>
                    {item.date}
                  </div>

                </div>

                <div style={{
                  padding: 18,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border)'
                }}>

                  <div style={{
                    color: 'var(--text-muted)',
                    fontSize: 13,
                    marginBottom: 6
                  }}>
                    Horário
                  </div>

                  <div style={{
                    fontWeight: 600
                  }}>
                    {item.hour}
                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </ClientLayout>
  )
}