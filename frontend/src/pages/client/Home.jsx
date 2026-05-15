import { useState, useEffect } from "react"
import { barberShopService } from "../../services/barberShopService"
import BarberCard from '../../components/BarberCard'

export default function Home() {
  const [shops, setShops] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData(coords = null) {
      try {
        // Busca os dados (com ou sem coordenadas)
        const params = coords ? { lat: coords.latitude, lon: coords.longitude } : {};
        const data = await barberShopService.getAll(params);
        console.log(data);
        
        setShops(data || []);
      } catch (error) {
        console.error("Erro ao carregar barbearias:", error);
      } finally {
        setLoading(false); // Sai do loading independente de ter achado ou não
      }
    }

    // 1. Tenta obter a localização com um tempo limite (timeout)
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Usuário aceitou
          loadData(position.coords);
        },
        (error) => {
          // Usuário negou ou erro de GPS - Carrega sem distância
          console.warn("GPS não disponível, carregando lista padrão.");
          loadData();
        },
        { timeout: 5000 } // Se em 5 segundos o usuário não decidir, segue sem GPS
      );
    } else {
      // Navegador não suporta geolocalização
      loadData();
    }
  }, []);

  // ESTADO DE CARREGAMENTO
  if (loading) {
    return (
      <div className="container" style={{ paddingTop: '100px', textAlign: 'center' }}>
        <div className="spinner"></div> {/* Opcional: um ícone de carregando */}
        <h2 style={{ marginTop: '20px', opacity: 0.6 }}>Buscando as melhores barbearias...</h2>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="page-header fade-in">
        <div className="gold-line" />
        <h1 className="page-title">Barbearias Próximas</h1>
        <p className="page-subtitle">Descubra as melhores barbearias da sua região.</p>
      </div>

      <div className="card" style={{ marginBottom: 28 }}>
        <input className="form-control" placeholder="Buscar barbearias..." />
      </div>

      {/* VERIFICAÇÃO SE A LISTA ESTÁ VAZIA */}
      {shops.length > 0 ? (
        <div className="grid-2 fade-in">
          {shops.map(shop => (
            <BarberCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        /* ESTADO VAZIO: Quando não há barbearias no banco de dados */
        <div className="card fade-in" style={{ 
            padding: '80px 20px', 
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
          <span style={{ fontSize: '48px', marginBottom: '20px' }}>💈</span>
          <h2 style={{ marginBottom: '10px' }}>Nenhuma barbearia encontrada</h2>
          <p style={{ opacity: 0.7, maxWidth: '400px' }}>
            Parece que ainda não existem estabelecimentos cadastrados nesta região. 
            Tente buscar em outra cidade ou volte mais tarde!
          </p>
        </div>
      )}
    </div>
  )
}