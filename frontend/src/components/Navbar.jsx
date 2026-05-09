import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useNotification } from '../hooks/useNotification'
import NotificationPopup from './NotificationPopup'

export default function Navbar({ variant = 'client' }) {
  const { user, logout } = useAuth()
  const { unreadCount } = useNotification()
  const navigate = useNavigate()
  const location = useLocation()
  const [showNotif, setShowNotif] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userMenuRef = useRef(null)

  useEffect(() => {
    function handleClick(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const clientLinks = [
    { to: '/', label: 'Descobrir' },
    { to: '/my-appointments', label: 'Agendamentos' },
  ]

  const barberLinks = [
    { to: '/barber/dashboard', label: 'Dashboard' },
    { to: '/barber/appointments', label: 'Agenda' },
    { to: '/barber/shop', label: 'Minha Loja' },
    { to: '/barber/services', label: 'Serviços' },
    { to: '/barber/schedules', label: 'Horários' },
  ]

  const links = variant === 'barber' ? barberLinks : clientLinks

  return (
    <>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(10,10,10,0.9)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          height: 64,
          gap: 32
        }}>
          {/* Logo */}
          <Link to={variant === 'barber' ? '/barber/dashboard' : '/'} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--gold)',
            letterSpacing: '-0.5px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            flexShrink: 0
          }}>
            <span style={{ fontSize: 18 }}>✂</span>
            BarberHub
          </Link>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: 4, flex: 1 }}>
            {links.map(link => {
              const active = location.pathname === link.to
              return (
                <Link key={link.to} to={link.to} style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 14,
                  fontWeight: 500,
                  color: active ? 'var(--gold)' : 'var(--text-secondary)',
                  background: active ? 'var(--gold-dim)' : 'transparent',
                  transition: 'var(--transition)',
                  whiteSpace: 'nowrap'
                }}
                  onMouseEnter={e => !active && (e.currentTarget.style.color = 'var(--text-primary)')}
                  onMouseLeave={e => !active && (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {/* Notification bell */}
            <button
              onClick={() => setShowNotif(v => !v)}
              style={{
                position: 'relative',
                width: 40,
                height: 40,
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'var(--transition)'
              }}
            >
              🔔
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: 6,
                  right: 6,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  border: '2px solid var(--bg-primary)'
                }} />
              )}
            </button>

            {/* User menu */}
            <div ref={userMenuRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(v => !v)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '6px 14px 6px 6px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-primary)',
                  fontSize: 14,
                  transition: 'var(--transition)'
                }}
              >
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: 'var(--gold-dim)',
                  border: '1px solid var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  color: 'var(--gold)',
                  fontWeight: 600
                }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span style={{ maxWidth: 100, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.name?.split(' ')[0]}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>▼</span>
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  padding: 8,
                  minWidth: 180,
                  boxShadow: 'var(--shadow-card)',
                  animation: 'slideDown 0.15s ease',
                  zIndex: 200
                }}>
                  <div style={{ padding: '8px 12px', borderBottom: '1px solid var(--border)', marginBottom: 8 }}>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {user?.role === 'barber' ? '✂ Barbeiro' : '👤 Cliente'}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-ghost btn-sm"
                    style={{ width: '100%', justifyContent: 'flex-start', color: 'var(--error)' }}
                  >
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {showNotif && <NotificationPopup onClose={() => setShowNotif(false)} />}
    </>
  )
}