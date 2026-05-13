import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'

export default function Register() {

  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'CLIENT'
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {

    e.preventDefault()

    try {

      setLoading(true)
      setError('')

      await authService.register(form)

      navigate('/login')

    } catch (err) {

      setError('Erro ao criar conta.')

    } finally {

      setLoading(false)

    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 520px',
      background: 'var(--bg-primary)'
    }}>

      {/* Left */}
      <div style={{
        background: `
          linear-gradient(
            rgba(0,0,0,0.78),
            rgba(0,0,0,0.9)
          ),
          url('https://images.unsplash.com/photo-1503951458645-643d53bfd90f?q=80&w=1600')
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center'
      }}>

        <div className="container fade-in">

          <div className="gold-line" />

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 64,
            lineHeight: 1.05,
            marginBottom: 28,
            maxWidth: 640
          }}>
            O novo padrão para gestão de barbearias.
          </h1>

          <p style={{
            maxWidth: 540,
            color: 'var(--text-secondary)',
            fontSize: 18,
            lineHeight: 1.8
          }}>
            Organize sua agenda, atraia clientes
            e transforme sua barbearia em um negócio
            moderno e escalável.
          </p>

        </div>

      </div>

      {/* Right */}
      <div style={{
        background: 'var(--bg-secondary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40
      }}>

        <div style={{
          width: '100%',
          maxWidth: 400
        }}>

          {/* Header */}
          <div style={{
            marginBottom: 36
          }}>

            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 34,
              color: 'var(--gold)',
              marginBottom: 10
            }}>
              Criar Conta
            </h2>

            <p style={{
              color: 'var(--text-secondary)'
            }}>
              Comece gratuitamente agora mesmo.
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <div className="form-group">

              <label className="form-label">
                Nome Completo
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Digite seu nome"
                value={form.name}
                onChange={e =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
              />

            </div>

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
                placeholder="Crie uma senha"
                value={form.password}
                onChange={e =>
                  setForm({
                    ...form,
                    password: e.target.value
                  })
                }
              />

            </div>

            {/* Account Type */}
            <div className="form-group">

              <label className="form-label">
                Tipo de Conta
              </label>

              <div className="grid-2">

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      role: 'CLIENT'
                    })
                  }
                  style={{
                    padding: 20,
                    borderRadius: 'var(--radius-md)',
                    border: form.role === 'CLIENT'
                      ? '1px solid var(--gold)'
                      : '1px solid var(--border)',

                    background: form.role === 'CLIENT'
                      ? 'var(--gold-dim)'
                      : 'var(--bg-card)',

                    color: form.role === 'CLIENT'
                      ? 'var(--gold)'
                      : 'var(--text-primary)',

                    transition: 'var(--transition)'
                  }}
                >

                  <div style={{
                    fontSize: 28,
                    marginBottom: 8
                  }}>
                    👤
                  </div>

                  <div style={{
                    fontWeight: 600
                  }}>
                    Cliente
                  </div>

                </button>

                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      ...form,
                      role: 'BARBER'
                    })
                  }
                  style={{
                    padding: 20,
                    borderRadius: 'var(--radius-md)',
                    border: form.role === 'BARBER'
                      ? '1px solid var(--gold)'
                      : '1px solid var(--border)',

                    background: form.role === 'BARBER'
                      ? 'var(--gold-dim)'
                      : 'var(--bg-card)',

                    color: form.role === 'BARBER'
                      ? 'var(--gold)'
                      : 'var(--text-primary)',

                    transition: 'var(--transition)'
                  }}
                >

                  <div style={{
                    fontSize: 28,
                    marginBottom: 8
                  }}>
                    ✂
                  </div>

                  <div style={{
                    fontWeight: 600
                  }}>
                    Barbeiro
                  </div>

                </button>

              </div>

            </div>

            {error && (
              <div
                className="badge badge-error"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: 12,
                  marginBottom: 20
                }}
              >
                {error}
              </div>
            )}

            <button
              className="btn btn-primary btn-lg"
              style={{
                width: '100%',
                marginTop: 12
              }}
              disabled={loading}
            >
              {
                loading
                  ? 'Criando conta...'
                  : 'Criar Conta'
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
            Já possui conta?{' '}

            <Link
              to="/login"
              style={{
                color: 'var(--gold)',
                fontWeight: 600
              }}
            >
              Entrar
            </Link>

          </div>

        </div>

      </div>

    </div>
  )
}