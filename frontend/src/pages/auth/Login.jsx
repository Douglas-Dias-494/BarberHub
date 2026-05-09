import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'

export default function Login() {

  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    try {

      setLoading(true)
      setError('')

      const response = await login(form)

      localStorage.setItem('token', response.token)

      setUser(response.user)

      if (response.user.role === 'barber') {
        navigate('/barber/dashboard')
      } else {
        navigate('/')
      }

    } catch (err) {

      setError('Email ou senha inválidos.')

    } finally {

      setLoading(false)

    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 480px',
      background: 'var(--bg-primary)'
    }}>

      {/* Left */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: `
          linear-gradient(
            rgba(0,0,0,0.72),
            rgba(0,0,0,0.85)
          ),
          url('https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=1600')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>

        <div className="container" style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }}>

          <div className="fade-in">

            <div className="gold-line" />

            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 68,
              lineHeight: 1,
              marginBottom: 24,
              maxWidth: 600
            }}>
              Gestão moderna para barbearias premium.
            </h1>

            <p style={{
              fontSize: 18,
              color: 'var(--text-secondary)',
              maxWidth: 520,
              lineHeight: 1.8
            }}>
              Controle agendamentos, horários, serviços
              e clientes em uma plataforma elegante,
              rápida e profissional.
            </p>

          </div>

        </div>

      </div>

      {/* Right */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        background: 'var(--bg-secondary)'
      }}>

        <div style={{
          width: '100%',
          maxWidth: 380
        }}>

          {/* Logo */}
          <div style={{
            marginBottom: 40
          }}>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 34,
              color: 'var(--gold)',
              marginBottom: 10
            }}>
              ✂ BarberHub
            </h2>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: 15
            }}>
              Entre na sua conta
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                placeholder="Digite seu email"
                value={form.email}
                onChange={e =>
                  setForm({
                    ...form,
                    email: e.target.value
                  })
                }
              />

            </div>

            <div className="form-group">

              <label className="form-label">
                Senha
              </label>

              <input
                type="password"
                className="form-control"
                placeholder="Digite sua senha"
                value={form.password}
                onChange={e =>
                  setForm({
                    ...form,
                    password: e.target.value
                  })
                }
              />

            </div>

            {error && (
              <div
                className="badge badge-error"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: 20,
                  padding: 12
                }}
              >
                {error}
              </div>
            )}

            <button
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                marginTop: 10
              }}
              disabled={loading}
            >
              {
                loading
                  ? 'Entrando...'
                  : 'Entrar'
              }
            </button>

          </form>

          {/* Footer */}
          <div style={{
            marginTop: 24,
            textAlign: 'center',
            fontSize: 14,
            color: 'var(--text-secondary)'
          }}>
            Não possui conta?{' '}

            <Link
              to="/register"
              style={{
                color: 'var(--gold)',
                fontWeight: 600
              }}
            >
              Criar conta
            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}