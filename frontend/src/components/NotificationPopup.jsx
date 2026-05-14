import { useEffect, useRef } from 'react'
import { useNotification } from '../hooks/useNotification'
import { formatCurrency } from '../utils/formatCurrency'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function NotificationPopup({ onClose }) {
  const { notifications, markAsRead, markAllAsRead, toasts, removeToast } = useNotification()
  const ref = useRef(null)

  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose()
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [onClose])

  return (
    <>
      {/* Toasts */}
      <div style={{
        position: 'fixed',
        top: 80,
        right: 24,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        pointerEvents: 'none'
      }}>
        {toasts.map(toast => (
          <div key={toast.id} style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-hover)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px',
            fontSize: 14,
            color: 'var(--text-primary)',
            boxShadow: 'var(--shadow-card)',
            animation: 'slideDown 0.3s ease',
            pointerEvents: 'all',
            cursor: 'pointer',
            maxWidth: 300,
            borderLeft: `3px solid var(--gold)`
          }} onClick={() => removeToast(toast.id)}>
            {toast.message}
          </div>
        ))}
      </div>

      {/* Popup */}
      <div ref={ref} style={{
        position: 'fixed',
        top: 72,
        right: 24,
        width: 360,
        maxHeight: '70vh',
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-card)',
        zIndex: 300,
        animation: 'slideDown 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          borderBottom: '1px solid var(--border)'
        }}>
          <span style={{ fontWeight: 600, fontSize: 15 }}>Notificações</span>
          <div style={{ display: 'flex', gap: 8 }}>
            {notifications.some(n => !n.read) && (
              <button className="btn btn-ghost btn-sm" onClick={markAllAsRead} style={{ fontSize: 12 }}>
                Marcar todas lidas
              </button>
            )}
            <button className="btn btn-ghost btn-sm" onClick={onClose} style={{ fontSize: 16, padding: '4px 8px' }}>
              ✕
            </button>
          </div>
        </div>

        <div style={{ overflowY: 'auto', flex: 1 }}>
          {notifications.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔕</div>
              <div style={{ fontSize: 14 }}>Nenhuma notificação</div>
            </div>
          ) : (
            notifications.map(n => (
              <div key={n.id}
                onClick={() => markAsRead(n.id)}
                style={{
                  padding: '14px 20px',
                  borderBottom: '1px solid var(--border)',
                  cursor: 'pointer',
                  background: n.read ? 'transparent' : 'rgba(201,168,76,0.04)',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--gold)',
                      marginBottom: 6,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}>
                      📅 Novo Agendamento
                      {!n.read && (
                        <span style={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          background: 'var(--gold)',
                          display: 'inline-block'
                        }} />
                      )}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Cliente:</strong> {n.client}</div>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Serviço:</strong> {n.service}</div>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Horário:</strong> {n.hour}</div>
                      <div><strong style={{ color: 'var(--text-primary)' }}>Valor:</strong> {formatCurrency(n.price)}</div>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6 }}>
                  {n.appointmentDate ? format(new Date(n.appointmentDate), "dd/MM 'às' HH:mm", { locale: ptBR }) : 'agora'}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}