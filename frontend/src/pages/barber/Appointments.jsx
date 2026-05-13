import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import api from '../../services/api'

export default function Appointments() {

  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    async function loadAppointments() {

      try {

        const response = await api.get('/appointments')

        setAppointments(response.data)

      } catch (err) {

        console.error(err)

      } finally {

        setLoading(false)

      }
    }

    loadAppointments()

  }, [])

  function getStatusBadge(status) {

    switch (status) {

      case 'CONFIRMED':
        return 'badge-success'

      case 'CANCELED':
        return 'badge-error'

      case 'PENDING':
        return 'badge-warning'

      default:
        return 'badge-info'
    }
  }

  return (
    <>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>

        {/* Header */}
        <div className="page-header fade-in">

          <div className="gold-line" />

          <h1 className="page-title">
            Agenda de Agendamentos
          </h1>

          <p className="page-subtitle">
            Gerencie os horários e clientes da sua barbearia.
          </p>

        </div>

        {/* Loading */}
        {loading && (

          <div
            className="card"
            style={{
              textAlign: 'center',
              padding: 60
            }}
          >
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--gold)',
              margin: '0 auto 20px',
              animation: 'spin 1s linear infinite'
            }} />

            <p style={{
              color: 'var(--text-secondary)'
            }}>
              Carregando agendamentos...
            </p>

          </div>
        )}

        {/* Empty */}
        {!loading && appointments.length === 0 && (

          <div
            className="card fade-in"
            style={{
              textAlign: 'center',
              padding: 60
            }}
          >

            <div style={{
              fontSize: 52,
              marginBottom: 20
            }}>
              📅
            </div>

            <h2 style={{
              fontSize: 24,
              marginBottom: 10
            }}>
              Nenhum agendamento encontrado
            </h2>

            <p style={{
              color: 'var(--text-secondary)'
            }}>
              Os novos horários marcados aparecerão aqui.
            </p>

          </div>
        )}

        {/* Appointments */}
        {!loading && appointments.length > 0 && (

          <div className="grid-2">

            {appointments.map(appointment => (

              <div
                key={appointment.id}
                className="card fade-in"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20
                }}
              >

                {/* Top */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>

                  <div>

                    <div className="gold-line" />

                    <h2 style={{
                      fontSize: 24,
                      fontWeight: 700,
                      marginBottom: 6
                    }}>
                      {appointment.clientName}
                    </h2>

                    <p style={{
                      color: 'var(--text-secondary)',
                      fontSize: 14
                    }}>
                      {appointment.clientEmail}
                    </p>

                  </div>

                  <span className={`badge ${getStatusBadge(appointment.status)}`}>
                    {appointment.status}
                  </span>

                </div>

                {/* Divider */}
                <div className="divider" />

                {/* Info */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14
                }}>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Serviço
                    </span>

                    <span style={{ fontWeight: 600 }}>
                      {appointment.serviceName}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Data
                    </span>

                    <span>
                      {appointment.date}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Horário
                    </span>

                    <span>
                      {appointment.hour}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ color: 'var(--text-muted)' }}>
                      Valor
                    </span>

                    <span style={{
                      color: 'var(--gold)',
                      fontWeight: 700
                    }}>
                      R$ {appointment.price}
                    </span>
                  </div>

                </div>

                {/* Actions */}
                <div style={{
                  display: 'flex',
                  gap: 12,
                  marginTop: 10
                }}>

                  <button
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    Confirmar
                  </button>

                  <button
                    className="btn btn-danger"
                    style={{ flex: 1 }}
                  >
                    Cancelar
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </>
  )
}