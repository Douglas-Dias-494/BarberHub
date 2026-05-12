import BarberLayout from '../../layouts/BarberLayout'
import { barberShopService } from '../../services/barberShopService';
import { useState } from 'react';
import { useEffect } from 'react';

export default function MyShop() {

    const [shop, setShop] = useState(null);

      useEffect(() => {
        async function loadShop() {
          const data = await barberShopService.getMyShop();
          setShop(data);
        }
        loadShop();
      }, []);

      if (!shop) return <BarberLayout><p>Carregando...</p></BarberLayout>;



  return (
    <BarberLayout>

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

          <div style={{
            height: 260,
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: 24
          }}>

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

          <div className="grid-2">

            <div className="form-group">
              <label className="form-label">
                Nome da Barbearia
              </label>

              <input
                className="form-control"
                defaultValue="BarberHub Premium"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Telefone
              </label>

              <input
                className="form-control"
                defaultValue="(11) 99999-9999"
              />
            </div>

          </div>

          <div className="form-group">

            <label className="form-label">
              Endereço
            </label>

            <input
              className="form-control"
              defaultValue="Alameda Rio Negro, Barueri"
            />

          </div>

          <div className="form-group">

            <label className="form-label">
              Descrição
            </label>

            <textarea
              className="form-control"
              rows={5}
              defaultValue="Barbearia premium especializada em cortes modernos."
            />

          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 24
          }}>

            <button className="btn btn-primary btn-lg">
              Salvar Alterações
            </button>

          </div>

        </div>

      </div>

    </BarberLayout>
  )
}