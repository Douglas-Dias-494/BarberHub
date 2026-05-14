import { useState, useEffect } from "react"
import { barberShopService } from "../../services/barberShopService"

export default function MyShop() {

  const [shop, setShop] = useState(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {

    async function loadShop() {

      try {

        const data = await barberShopService.getMyShop()

        setShop(data)

      } catch (error) {

        console.error(error)

      }
    }

    loadShop()

  }, [])

  function handleChange(e) {

    const { name, value } = e.target

    setShop(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function isShopOpen() {

    const now = new Date()

    const currentHour = now.getHours()
    const currentMinutes = now.getMinutes()

    const currentTime = `${String(currentHour).padStart(2, '0')}:${String(currentMinutes).padStart(2, '0')}`

    return currentTime >= shop.openHour &&
           currentTime <= shop.closeHour
  }

  async function handleSave() {

    try {

      await barberShopService.update(shop.id, shop)

      setEditing(false)

    } catch (error) {

      console.error(error)

    }
  }

  if (!shop) {
    return <h1>Carregando...</h1>
  }

  return (

    <div className="container">

      <div className="page-header fade-in">

        <div className="gold-line" />

        <h1 className="page-title">
          Minha Barbearia
        </h1>

        <p className="page-subtitle">
          Gerencie as informações da sua loja.
        </p>

      </div>

      <div className="card fade-in">

        {/* HEADER CARD */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24
          }}
        >

          <div>

            <h2
              style={{
                marginBottom: 8
              }}
            >
              {shop.name}
            </h2>

            <span
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                fontSize: 14,
                fontWeight: 600,
                background: isShopOpen()
                  ? 'rgba(16, 185, 129, 0.15)'
                  : 'rgba(239, 68, 68, 0.15)',
                color: isShopOpen()
                  ? '#10b981'
                  : '#ef4444'
              }}
            >
              {isShopOpen() ? 'Aberta agora' : 'Fechada'}
            </span>

          </div>

          <button
            className="btn btn-secondary"
            onClick={() => setEditing(!editing)}
          >
            ✏️ {editing ? 'Cancelar' : 'Editar'}
          </button>

        </div>

        {/* IMAGEM */}
        <div
          style={{
            height: 260,
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: 24
          }}
        >

          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=1600"
            alt="shop"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

        </div>

        {/* VISUALIZAÇÃO */}
        {!editing && (

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 18
            }}
          >

            <div>
              <strong>Telefone:</strong>
              <p>{shop.phone}</p>
            </div>

            <div>
              <strong>Endereço:</strong>
              <p>{shop.address}</p>
            </div>

            <div>
              <strong>Dias:</strong>
              <p>{shop.openDays}</p>
            </div>

            <div>
              <strong>Horário:</strong>
              <p>
                {shop.openHour} às {shop.closeHour}
              </p>
            </div>

            <div>
              <strong>Latitude:</strong>
              <p>{shop.latitude}</p>
            </div>

            <div>
              <strong>Longitude:</strong>
              <p>{shop.longitude}</p>
            </div>

          </div>
        )}

        {/* MODO EDIÇÃO */}
        {editing && (

          <div>

            <div className="grid-2">

              <div className="form-group">

                <label className="form-label">
                  Nome da Barbearia
                </label>

                <input
                  name="name"
                  className="form-control"
                  value={shop.name}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label className="form-label">
                  Telefone
                </label>

                <input
                  name="phone"
                  className="form-control"
                  value={shop.phone}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="form-group">

              <label className="form-label">
                Endereço
              </label>

              <input
                name="address"
                className="form-control"
                value={shop.address}
                onChange={handleChange}
              />

            </div>

            <div className="grid-2">

              <div className="form-group">

                <label className="form-label">
                  Dias de funcionamento
                </label>

                <input
                  name="openDays"
                  className="form-control"
                  value={shop.openDays}
                  onChange={handleChange}
                />

              </div>

              <div className="form-group">

                <label className="form-label">
                  Horário de abertura
                </label>

                <input
                  type="time"
                  name="openHour"
                  className="form-control"
                  value={shop.openHour}
                  onChange={handleChange}
                />

              </div>

            </div>

            <div className="form-group">

              <label className="form-label">
                Horário de fechamento
              </label>

              <input
                type="time"
                name="closeHour"
                className="form-control"
                value={shop.closeHour}
                onChange={handleChange}
              />

            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 24
              }}
            >

              <button
                className="btn btn-primary btn-lg"
                onClick={handleSave}
              >
                Salvar Alterações
              </button>

            </div>

          </div>
        )}

      </div>

    </div>
  )
}