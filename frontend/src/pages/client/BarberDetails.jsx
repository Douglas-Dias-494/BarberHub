import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';
import ClientLayout from '../../layouts/ClientLayout';

export default function BarberDetails() {
  const { id } = useParams(); // Pega o ID da URL
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShopData() {
      try {
        setLoading(true);
        // Busca os dados da barbearia específica por ID
        // Certifique-se de ter esse endpoint no seu Backend (GET /barbershops/{id})
        const response = await api.get(`/barbershops/${id}`);
        setShop(response.data);
      } catch (err) {
        console.error("Erro ao carregar dados da barbearia:", err);
      } finally {
        setLoading(false);
      }
    }

    loadShopData();
  }, [id]);

  if (loading) return <div className="container"><p>Carregando barbearia...</p></div>;
  if (!shop) return <div className="container"><p>Barbearia não encontrada.</p></div>;

  return (
    <div className="container fade-in" style={{ paddingTop: 40 }}>
      <Link to="/" style={{ color: 'var(--gold)', marginBottom: 20, display: 'block' }}>
        ← Voltar para a lista
      </Link>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div className="gold-line" />
            <h1 className="page-title" style={{ marginBottom: 10 }}>{shop.name}</h1>
            <p className="page-subtitle">{shop.address}</p>
          </div>
          <span className={`badge ${shop.isOpen ? 'badge-success' : 'badge-error'}`}>
             {shop.isOpen ? 'Aberto Agora' : 'Fechado'}
          </span>
        </div>

        <div className="divider" style={{ margin: '30px 0' }} />

        <div className="grid-2">
          <div>
            <h3 style={{ color: 'var(--gold)', marginBottom: 15 }}>Informações</h3>
            <p><strong>Telefone:</strong> {shop.phone}</p>
            <p><strong>Dias de Funcionamento:</strong> {shop.openDays}</p>
            <p><strong>Horário:</strong> {shop.openHour} às {shop.closeHour}</p>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
           <button className="btn btn-primary" style={{ width: '100%', padding: 20, fontSize: 18 }}>
             Agendar Serviço
           </button>
        </div>
      </div>
    </div>
  );
}