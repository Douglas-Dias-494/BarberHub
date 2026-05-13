import { useState } from 'react'
import BarberLayout from '../../layouts/BarberLayout'
import api from '../../services/api'

export default function CreateService() {

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {

    e.preventDefault()

    try {

      setLoading(true)

      await api.post('/services', form)

      setSuccess(true)

      setForm({
        name: '',
        description: '',
        price: '',
        duration: ''
      })

    } catch (err) {

      console.error(err)

    } finally {

      setLoading(false)

      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    }
  }

  return (

      <div className="container">

        {/* Header */}
        <div className="page-header fade-in">

          <div className="gold-line" />

          <h1 className="page-title">
            Novo Serviço
          </h1>

          <p className="page-subtitle">
            Cadastre os serviços oferecidos pela sua barbearia.
          </p>

        </div>

        {/* Form */}
        <div
          className="card fade-in"
          style={{
            maxWidth: 700
          }}
        >

          <form onSubmit={handleSubmit}>

            {/* Name */}
            <div className="form-group">

              <label className="form-label">
                Nome do Serviço
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Ex: Corte Degradê"
                value={form.name}
                onChange={e =>
                  setForm({
                    ...form,
                    name: e.target.value
                  })
                }
              />

            </div>

            {/* Description */}
            <div className="form-group">

              <label className="form-label">
                Descrição
              </label>

              <textarea
                className="form-control"
                rows={5}
                placeholder="Descreva o serviço..."
                value={form.description}
                onChange={e =>
                  setForm({
                    ...form,
                    description: e.target.value
                  })
                }
              />

            </div>

            {/* Grid */}
            <div className="grid-2">

              {/* Price */}
              <div className="form-group">

                <label className="form-label">
                  Preço
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="R$ 0,00"
                  value={form.price}
                  onChange={e =>
                    setForm({
                      ...form,
                      price: e.target.value
                    })
                  }
                />

              </div>

              {/* Duration */}
              <div className="form-group">

                <label className="form-label">
                  Duração (min)
                </label>

                <input
                  type="number"
                  className="form-control"
                  placeholder="30"
                  value={form.duration}
                  onChange={e =>
                    setForm({
                      ...form,
                      duration: e.target.value
                    })
                  }
                />

              </div>

            </div>

            {/* Success */}
            {success && (
              <div
                className="badge badge-success"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: 12,
                  marginBottom: 20
                }}
              >
                Serviço cadastrado com sucesso!
              </div>
            )}

            {/* Actions */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginTop: 24
            }}>

              <button
                className="btn btn-primary btn-lg"
                disabled={loading}
              >
                {
                  loading
                    ? 'Salvando...'
                    : 'Salvar Serviço'
                }
              </button>

            </div>

          </form>

        </div>

      </div>
  )
}