import ClientLayout from '../../layouts/ClientLayout'
import BarberCard from '../../components/BarberCard'

export default function Home() {

  console.log("VOCÊ ESTÁ NA HOME");

  const shops = [
    {
      id: 1,
      name: 'BarberHub Premium',
      address: 'Barueri - SP',
      openHour: '09:00',
      closeHour: '22:00',
      open: true,
      distance: 1.2
    },
    {
      id: 2,
      name: 'Elite Barber',
      address: 'Alphaville - SP',
      openHour: '10:00',
      closeHour: '20:00',
      open: true,
      distance: 2.8
    }
  ]

  return (

      <div className="container">

        {/* Header */}
        <div className="page-header fade-in">

          <div className="gold-line" />

          <h1 className="page-title">
            Barbearias Próximas
          </h1>

          <p className="page-subtitle">
            Descubra as melhores barbearias da sua região.
          </p>

        </div>

        {/* Search */}
        <div
          className="card"
          style={{
            marginBottom: 28
          }}
        >

          <input
            className="form-control"
            placeholder="Buscar barbearias..."
          />

        </div>

        {/* Grid */}
        <div className="grid-2">

          {shops.map(shop => (

            <BarberCard
              key={shop.id}
              shop={shop}
            />

          ))}

        </div>

      </div>
  )
}