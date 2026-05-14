import { useState, useEffect } from 'react'
import BarberLayout from '../../layouts/BarberLayout'
import { barberShopService } from '../../services/barberShopService'

export default function CreateService() {
  const initialFormState = {
    id: null,
    name: '',
    description: '',
    price: '',
    duration: ''
  }

  const [shopId, setShopId] = useState(null)
  const [services, setServices] = useState([])
  const [form, setForm] = useState(initialFormState)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')
  const [pageLoading, setPageLoading] = useState(true)

  // 1. Carrega as informações da barbearia primeiro
  useEffect(() => {
    async function loadShopAndServices() {
      try {
        const shopData = await barberShopService.getMyShop()
        
        if (shopData && shopData.id) {
          setShopId(shopData.id)
          
          const servicesData = await barberShopService.getServices(shopData.id)

          // Trata caso venha encapsulado em .content (Pageable) ou direto
          const listaServicos = servicesData?.content || servicesData || []
          setServices(listaServicos)
        } else {
          console.warn('[DEBUG 3 - AVISO] shopData veio vazio ou sem a propriedade .id:', shopData)
        }
      } catch (err) {
        console.error('[DEBUG ERRO] Erro ao carregar dados iniciais:', err)
      } finally {
        setPageLoading(false)
      }
    }

    loadShopAndServices()
  }, [])

  // Função auxiliar para atualizar a listagem após mutações
  async function fetchServices() {
    console.log('[DEBUG FETCH] fetchServices disparado. Estado atual do shopId:', shopId)
    if (!shopId) {
      console.warn('[DEBUG FETCH - ABORTADO] Busca cancelada porque shopId é null ou undefined')
      return
    }
    try {
      const servicesData = await barberShopService.getServices(shopId)
      const listaServicos = servicesData?.content || servicesData || []
      console.log('[DEBUG FETCH - SUCESSO] Novos serviços carregados:', listaServicos)
      setServices(listaServicos)
    } catch (err) {
      console.error('[DEBUG FETCH - ERRO] Erro ao atualizar lista de serviços:', err)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!shopId) return

    try {
      setLoading(true)
      const { id, ...serviceData } = form

      if (id) {
        await barberShopService.updateService(shopId, id, serviceData)
        setMessage('Serviço atualizado com sucesso!')
      } else {
        await barberShopService.createService(shopId, serviceData)
        setMessage('Serviço cadastrado com sucesso!')
      }

      setSuccess(true)
      setForm(initialFormState)
      await fetchServices()
    } catch (err) {
      console.error('Erro ao salvar serviço:', err)
    } finally {
      setLoading(false)
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  function handleEdit(service) {
    setForm(service)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleDelete(serviceId) {
    if (!confirm('Deseja realmente excluir este serviço?')) return
    try {
      await barberShopService.deleteService(shopId, serviceId)
      setMessage('Serviço excluído com sucesso!')
      setSuccess(true)
      await fetchServices()
      if (form.id === serviceId) setForm(initialFormState)
    } catch (err) {
      console.error('Erro ao deletar:', err)
    } finally {
      setTimeout(() => setSuccess(false), 3000)
    }
  }

  if (pageLoading) {
    return <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Carregando dados...</h1>
  }

  return (
    <div className="container">
      {/* Header */}
      <div className="page-header fade-in">
        <div className="gold-line" />
        <h1 className="page-title">
          {form.id ? 'Editar Serviço' : 'Novo Serviço'}
        </h1>
        <p className="page-subtitle">
          Gerencie os serviços oferecidos pela sua barbearia.
        </p>
      </div>

      {/* Grid Principal Layout */}
      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        
        {/* Formulário */}
        <div className="card fade-in" style={{ flex: '1 1 450px', maxWidth: 700 }}>
          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div className="form-group">
              <label className="form-label">Nome do Serviço</label>
              <input
                type="text"
                className="form-control"
                placeholder="Ex: Corte Degradê"
                value={form.name}
                required
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>

            {/* Grid Preço e Duração */}
            <div className="grid-2">
              {/* Price */}
              <div className="form-group">
                <label className="form-label">Preço</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="R$ 0,00"
                  value={form.price}
                  required
                  onChange={e => setForm({ ...form, price: e.target.value })}
                />
              </div>

              {/* Duration */}
              <div className="form-group">
                <label className="form-label">Duração (min)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="30"
                  value={form.duration}
                  required
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                />
              </div>
            </div>

            {/* Alertas de Feedback */}
            {success && (
              <div className="badge badge-success" style={{ width: '100%', justifyContent: 'center', padding: 12, marginBottom: 20 }}>
                {message}
              </div>
            )}

            {/* Ações do Formulário */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 24 }}>
              {form.id && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setForm(initialFormState)}
                >
                  Cancelar
                </button>
              )}
              <button className="btn btn-primary btn-lg" disabled={loading}>
                {loading ? 'Salvando...' : form.id ? 'Atualizar Serviço' : 'Salvar Serviço'}
              </button>
            </div>
          </form>
        </div>

        {/* Lista de Cards Existentes */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 className="page-title" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
            Serviços Cadastrados ({services.length})
          </h2>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {services.map(service => (
              <div key={service.id || service.name} className="card fade-in" style={{ padding: '20px', position: 'relative' }}>
                
                {/* Ícones de Ação */}
                <div style={{ position: 'absolute', top: '15px', right: '15px', display: 'flex', gap: '12px' }}>
                  <button 
                    onClick={() => handleEdit(service)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#e5c158' }}
                    title="Editar serviço"
                  >
                    ✏️
                  </button>
                  <button 
                    onClick={() => handleDelete(service.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: '#ff4d4d' }}
                    title="Deletar serviço"
                  >
                    🗑️
                  </button>
                </div>

                {/* Conteúdo do Card (Tag fechada corretamente) */}
                <h3 style={{ margin: '0 0 8px 0', paddingRight: '50px', fontSize: '1.2rem' }}>
                  {service.name}
                </h3>
                <p style={{ margin: '0 0 12px 0', color: '#aaa', fontSize: '0.9rem' }}>
                  {service.description || 'Sem descrição.'}
                </p>
                <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem' }}>
                  <span>💰 R$ {Number(service.price).toFixed(2)}</span>
                  <span>⏱️ {service.duration} min</span>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
