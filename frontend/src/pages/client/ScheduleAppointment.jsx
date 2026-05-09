import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ClientLayout from '../../layouts/ClientLayout'
import ServiceCard from '../../components/ServiceCard'
import ScheduleCard from '../../components/ScheduleCard'

export default function ScheduleAppointment() {

  const navigate = useNavigate()

  const [selectedService, setSelectedService] = useState(null)
  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedDate, setSelectedDate] = useState('2026-05-08')
  const [loading, setLoading] = useState(false)

  const services = [
    {
      id: 1,
      name: 'Corte Degradê',
      description: 'Corte moderno com acabamento premium.',
      duration: 45,
      price: 45
    },
    {
      id: 2,
      name: 'Barba Completa',
      description: 'Modelagem e acabamento de barba.',
      duration: 30,
      price: 35
    },
    {
      id: 3,
      name: 'Corte + Barba',
      description: 'Pacote premium completo.',
      duration: 60,
      price: 70
    }
  ]

  const schedules = [
    {
      id: 1,
      hour: '09:00'
    },
    {
      id: 2,
      hour: '10:00'
    },
    {
      id: 3,
      hour: '11:00'
    },
    {
      id: 4,
      hour: '14:00'
    },
    {
      id: 5,
      hour: '15:00'
    },
    {
      id: 6,
      hour: '16:00'
    }
  ]

  const unavailableHours = ['11:00', '15:00']

  async function handleSchedule() {

    if (!selectedService || !selectedHour) {
      return
    }

    try {

      setLoading(true)

      // API CALL
      // await api.post('/appointments', {...})

      setTimeout(() => {

        navigate('/my-appointments')

      }, 1200)

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)

    }
  }

  return (
    <ClientLayout>

      <div className="container">

        {/* Header */}
        <div className="page-header fade-in">

          <div className="gold-line" />

          <h1 className="page-title">
            Agendar Horário
          </h1>

          <p className="page-subtitle">
            Escolha um serviço e um horário disponível.
          </p>

        </div>

        <div className="grid-2">

          {/* Left */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}>

            {/* Services */}
            <div className="card fade-in">

              <h2 style={{
                fontSize: 24,
                marginBottom: 20
              }}>
                Serviços
              </h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}>

                {services.map(service => (

                  <div
                    key={service.id}
                    style={{
                      border: selectedService?.id === service.id
                        ? '1px solid var(--gold)'
                        : '1px solid transparent',

                      borderRadius: 'var(--radius-lg)',
                      transition: 'var(--transition)'
                    }}
                  >

                    <ServiceCard
                      service={service}
                      onSelect={() => setSelectedService(service)}
                    />

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Right */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}>

            {/* Date */}
            <div className="card fade-in">

              <h2 style={{
                fontSize: 22,
                marginBottom: 20
              }}>
                Data
              </h2>

              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
              />

            </div>

            {/* Hours */}
            <div className="card fade-in">

              <h2 style={{
                fontSize: 22,
                marginBottom: 20
              }}>
                Horários Disponíveis
              </h2>

              <div className="grid-3">

                {schedules.map(schedule => (

                  <ScheduleCard
                    key={schedule.id}
                    schedule={schedule}
                    selected={selectedHour?.id === schedule.id}
                    unavailable={unavailableHours.includes(schedule.hour)}
                    onSelect={() => setSelectedHour(schedule)}
                  />

                ))}

              </div>

            </div>

            {/* Summary */}
            <div className="card fade-in">

              <h2 style={{
                fontSize: 22,
                marginBottom: 20
              }}>
                Resumo
              </h2>

              {!selectedService && (
                <p style={{
                  color: 'var(--text-secondary)'
                }}>
                  Selecione um serviço.
                </p>
              )}

              {selectedService && (

                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14
                }}>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      color: 'var(--text-muted)'
                    }}>
                      Serviço
                    </span>

                    <span>
                      {selectedService.name}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      color: 'var(--text-muted)'
                    }}>
                      Duração
                    </span>

                    <span>
                      {selectedService.duration} min
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{
                      color: 'var(--text-muted)'
                    }}>
                      Horário
                    </span>

                    <span>
                      {selectedHour?.hour || '--:--'}
                    </span>
                  </div>

                  <div className="divider" />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{
                      fontWeight: 600
                    }}>
                      Total
                    </span>

                    <span style={{
                      fontSize: 28,
                      fontWeight: 700,
                      color: 'var(--gold)'
                    }}>
                      R$ {selectedService.price}
                    </span>
                  </div>

                  <button
                    className="btn btn-primary btn-lg"
                    style={{
                      width: '100%',
                      marginTop: 12
                    }}
                    disabled={
                      !selectedService ||
                      !selectedHour ||
                      loading
                    }
                    onClick={handleSchedule}
                  >
                    {
                      loading
                        ? 'Agendando...'
                        : 'Confirmar Agendamento'
                    }
                  </button>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </ClientLayout>
  )
}