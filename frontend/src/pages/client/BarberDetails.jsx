import ClientLayout from '../../layouts/ClientLayout'
import ServiceCard from '../../components/ServiceCard'

export default function BarberDetails() {

  const services = [
    {
      id: 1,
      name: 'Corte Degradê',
      description: 'Corte moderno com acabamento premium.',
      duration: 45,
      price: 45
    },
    {
      id: 2,
      name: 'Barba',
      description: 'Modelagem completa de barba.',
      duration: 30,
      price: 30
    }
  ]

  return (

      <div className="container">

        {/* Banner */}
        <div
          className="fade-in"
          style={{
            height: 320,
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            marginBottom: 32
          }}
        >

          <img
            src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=1600"
            alt="barber"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />

        </div>

        {/* Info */}
        <div className="page-header">

          <div className="gold-line" />

          <h1 className="page-title">
            BarberHub Premium
          </h1>

          <p className="page-subtitle">
            Alameda Rio Negro • Aberto até 22:00
          </p>

        </div>

        {/* Services */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20
        }}>

          {services.map(service => (

            <ServiceCard
              key={service.id}
              service={service}
              onSelect={() => {}}
            />

          ))}

        </div>

      </div>
  )
}