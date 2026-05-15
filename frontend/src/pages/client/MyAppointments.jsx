import { useEffect, useState } from 'react';
import {barberShopService} from '../../services/barberShopService';
import ClientLayout from '../../layouts/ClientLayout';

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAppointments() {
      try {
        setLoading(true);
        const data = await barberShopService.getMyAppointments();
        setAppointments(data || []);
      } catch (error) {
        console.error("Erro ao carregar agendamentos:", error);
      } finally {
        setLoading(false);
      }
    }
    loadAppointments();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <p className="page-subtitle">Carregando seus agendamentos...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header fade-in">
        <div className="gold-line" />
        <h1 className="page-title">Meus Agendamentos</h1>
        <p className="page-subtitle">
          {appointments.length > 0 
            ? "Acompanhe seus horários marcados." 
            : "Você ainda não possui agendamentos marcados."}
        </p>
      </div>

      {appointments.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {appointments.map((item) => (
            <div key={item.id} className="card fade-in">
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 24
              }}>
                <div>
                  <div className="gold-line" />
                  <h2 style={{ fontSize: 24, marginBottom: 6 }}>
                    {item.barberShopName
}
                  </h2>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {item.serviceName}
                  </p>
                </div>

                <span className={`badge ${
                  item.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'
                }`}>
                  {item.status}
                </span>
              </div>

              {/* Grid ajustado para 3 colunas ou flex-wrap */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                gap: 15 
              }}>
                
                {/* BLOCO: DATA */}
                <div className="info-block">
                  <div className="info-label">Data</div>
                  <div className="info-value">{item.appointmentDate}</div>
                </div>

                {/* BLOCO: HORÁRIO */}
                <div className="info-block">
                  <div className="info-label">Horário</div>
                  <div className="info-value">{item.appointmentHour}</div>
                </div>

                {/* NOVO BLOCO: VALOR TOTAL */}
                <div className="info-block" style={{ borderLeft: '2px solid var(--primary)' }}>
                  <div className="info-label">Valor Total</div>
                  <div className="info-value" style={{ color: 'var(--primary)' }}>
                    {/* Formatação para moeda Real R$ */}
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(item.totalPrice || 0)}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estilização rápida para os blocos de informação interna */}
      <style jsx>{`
        .info-block {
          padding: 18px;
          border-radius: var(--radius-md);
          background: var(--bg-secondary);
          border: 1px solid var(--border);
        }
        .info-label {
          color: var(--text-muted);
          font-size: 13px;
          margin-bottom: 6px;
        }
        .info-value {
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}