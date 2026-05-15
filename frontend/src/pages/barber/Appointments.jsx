import { useEffect, useState } from 'react'
import api from '../../services/api'
import { barberShopService } from '../../services/barberShopService'

export default function Appointments() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false) // Para feedback visual nos botões

  async function loadAppointments() {
    try {
      setLoading(true)
      const myShop = await barberShopService.getMyShop()
      const response = await api.get(`/appointments/${myShop.id}`)
      setAppointments(response.data)
    } catch (err) {
      console.error("Erro ao carregar agenda:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAppointments()
  }, [])

  // FUNÇÃO PARA APROVAR
  async function handleApprove(appointmentId) {
    try {
      setActionLoading(true)
      await api.put(`/appointments/${appointmentId}/approve`)
      
      // Atualiza a lista localmente para refletir a mudança
      setAppointments(prev => 
        prev.map(app => 
          app.id === appointmentId ? { ...app, status: 'CONFIRMED' } : app
        )
      )
      alert("Agendamento confirmado com sucesso!")
    } catch (err) {
      console.error(err)
      alert("Erro ao confirmar agendamento.")
    } finally {
      setActionLoading(false)
    }
  }

  // FUNÇÃO PARA REJEITAR
  async function handleReject(appointmentId) {
    if (!window.confirm("Tem certeza que deseja cancelar este agendamento?")) return

    try {
      setActionLoading(true)
      await api.put(`/appointments/${appointmentId}/reject`)
      
      // Atualiza a lista localmente
      setAppointments(prev => 
        prev.map(app => 
          app.id === appointmentId ? { ...app, status: 'CANCELLED' } : app
        )
      )
      alert("Agendamento cancelado.")
    } catch (err) {
      console.error(err)
      alert("Erro ao cancelar agendamento.")
    } finally {
      setActionLoading(false)
    }
  }

  function getStatusBadge(status) {
    switch (status) {
      case 'CONFIRMED': return 'badge-success'
      case 'CANCELLED': return 'badge-error'
      case 'PENDING': return 'badge-warning'
      default: return 'badge-info'
    }
  }

  return (
    <>
      <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
        {/* Header */}
        <div className="page-header fade-in">
          <div className="gold-line" />
          <h1 className="page-title">Agenda de Agendamentos</h1>
          <p className="page-subtitle">Gerencie os horários e clientes da sua barbearia.</p>
        </div>

        {/* Loading Principal */}
        {loading && (
          <div className="card" style={{ textAlign: 'center', padding: 60 }}>
            <div className="spinner" /> {/* Certifique-se de ter o CSS do spin */}
            <p style={{ color: 'var(--text-secondary)' }}>Carregando agendamentos...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && appointments.length === 0 && (
          <div className="card fade-in" style={{ textAlign: 'center', padding: 60 }}>
            <div style={{ fontSize: 52, marginBottom: 20 }}>📅</div>
            <h2 style={{ fontSize: 24, marginBottom: 10 }}>Nenhum agendamento encontrado</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Os novos horários marcados aparecerão aqui.</p>
          </div>
        )}

        {/* Listagem */}
        {!loading && appointments.length > 0 && (
          <div className="grid-2">
            {appointments.map(appointment => (
              <div key={appointment.id} className="card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div className="gold-line" />
                    <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 6 }}>
                      {appointment.clientName}
                    </h2>
                  </div>
                  <span className={`badge ${getStatusBadge(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>

                <div className="divider" />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Serviço</span>
                    <span style={{ fontWeight: 600 }}>{appointment.serviceName}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Data</span>
                    <span>{appointment.appointmentDate}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Horário</span>
                    <span>{appointment.appointmentHour}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Valor</span>
                    <span style={{ color: 'var(--gold)', fontWeight: 700 }}>
                      R$ {appointment.totalPrice}
                    </span>
                  </div>

                  {appointment.notes && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <span style={{ color: 'var(--text-muted)' }}>Observações</span>
                      <p>{appointment.notes}</p>
                    </div>
                  )}
                </div>

                {/* BOTÕES DE AÇÃO: Só aparecem se o status for PENDENTE */}
                {appointment.status === 'PENDING' && (
                  <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                    <button
                      className="btn btn-primary"
                      style={{ flex: 1 }}
                      onClick={() => handleApprove(appointment.id)}
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Processando...' : 'Confirmar'}
                    </button>

                    <button
                      className="btn btn-danger"
                      style={{ flex: 1 }}
                      onClick={() => handleReject(appointment.id)}
                      disabled={actionLoading}
                    >
                      {actionLoading ? '...' : 'Cancelar'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}