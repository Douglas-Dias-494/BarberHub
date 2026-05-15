import { useState, useEffect } from "react"
import { barberShopService } from "../../services/barberShopService"

const emptyShop = {
  name: "",
  phone: "",
  address: "",
  openDays: "",
  openHour: "",
  closeHour: ""
}

// Imagem genérica de barbearia estilosa
const COVER_IMAGE = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop";

export default function MyShop() {
  const [shop, setShop] = useState(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [hasShop, setHasShop] = useState(true)

  useEffect(() => {
    async function loadShop() {
      try {
        const data = await barberShopService.getMyShop()
        if (!data) {
          setHasShop(false)
          setShop(emptyShop)
          return
        }
        setHasShop(true)
        setShop(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    loadShop()
  }, [])

  function handleChange(e) {
    const { name, value } = e.target
    setShop(prev => ({ ...prev, [name]: value }))
  }

  function isShopOpen() {
    if (!shop?.openHour || !shop?.closeHour) return false
    const now = new Date()
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    return currentTime >= shop.openHour && currentTime <= shop.closeHour
  }

  async function handleSave() {
    try {
      if (!hasShop) {
        const createdShop = await barberShopService.create(shop)
        setShop(createdShop)
        setHasShop(true)
      } else {
        await barberShopService.update(shop.id, shop)
      }
      setEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) return <div className="container"><h1>Carregando...</h1></div>

  if (!hasShop && !editing) {
    return (
      <div className="container">
        <div className="card fade-in" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h1>Você ainda não cadastrou sua barbearia</h1>
          <p style={{ marginBottom: 32, opacity: 0.8 }}>Cadastre seu estabelecimento para começar a receber agendamentos.</p>
          <button className="btn btn-primary btn-lg" onClick={() => setEditing(true)}>➕ Cadastrar estabelecimento</button>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="page-header fade-in">
        <div className="gold-line" />
        <h1 className="page-title">Minha Barbearia</h1>
        <p className="page-subtitle">Gerencie as informações da sua loja.</p>
      </div>

      <div className="card fade-in" style={{ padding: 0, overflow: 'hidden' }}>
        {/* VIEW MODE: CARD COM FOTO DE FUNDO */}
        {hasShop && !editing ? (
          <div className="shop-view">
            {/* Banner com Imagem */}
            <div style={{ 
              height: '200px', 
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${COVER_IMAGE})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '24px',
              position: 'relative'
            }}>
              <div style={{ flex: 1 }}>
                <span style={{ 
                  backgroundColor: isShopOpen() ? '#10b981' : '#ef4444', 
                  color: 'white', 
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px', 
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}>
                  {isShopOpen() ? '● Aberto' : '● Fechado'}
                </span>
                <h2 style={{ color: 'white', marginTop: '12px', fontSize: '28px' }}>{shop.name}</h2>
              </div>
              
              <button 
                className="btn btn-secondary" 
                onClick={() => setEditing(true)}
                style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' }}
              >
                ✏️ Editar
              </button>
            </div>

            {/* Detalhes do Estabelecimento */}
            <div style={{ padding: '24px' }}>
              <div className="grid-2">
                <div className="info-block">
                  <h4 style={{ opacity: 0.6, fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>📍 Localização</h4>
                  <p style={{ fontWeight: 500 }}>{shop.address}</p>
                </div>
                <div className="info-block">
                  <h4 style={{ opacity: 0.6, fontSize: '12px', textTransform: 'uppercase', marginBottom: '8px' }}>📞 Contato</h4>
                  <p style={{ fontWeight: 500 }}>{shop.phone}</p>
                </div>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <h4 style={{ opacity: 0.6, fontSize: '12px', textTransform: 'uppercase', marginBottom: '12px' }}>🕒 Horários e Dias</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <div style={{ background: 'rgba(212, 175, 55, 0.1)', padding: '10px 16px', borderRadius: '8px', borderLeft: '3px solid #d4af37' }}>
                      <strong>{shop.openDays}</strong>
                   </div>
                   <div style={{ fontSize: '18px', fontWeight: 300 }}>
                      {shop.openHour} — {shop.closeHour}
                   </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* EDIT MODE: FORMULÁRIO */
          <div style={{ padding: '24px' }}>
            <h3 style={{ marginBottom: '20px' }}>{hasShop ? 'Editar Informações' : 'Novo Cadastro'}</h3>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Nome da Barbearia</label>
                <input name="name" className="form-control" value={shop.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Telefone</label>
                <input name="phone" className="form-control" value={shop.phone} onChange={handleChange} />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Endereço</label>
              <input name="address" className="form-control" value={shop.address} onChange={handleChange} />
            </div>

            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Dias de funcionamento</label>
                <input name="openDays" className="form-control" value={shop.openDays} onChange={handleChange} placeholder="Ex: Seg a Sáb" />
              </div>
              <div className="form-group">
                <label className="form-label">Abertura</label>
                <input type="time" name="openHour" className="form-control" value={shop.openHour} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Fechamento</label>
                <input type="time" name="closeHour" className="form-control" value={shop.closeHour} onChange={handleChange} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
              {hasShop && (
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancelar</button>
              )}
              <button className="btn btn-primary btn-lg" onClick={handleSave}>
                {hasShop ? 'Salvar Alterações' : 'Cadastrar estabelecimento'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}