import Navbar from '../components/Navbar'

export default function ClientLayout({ children }) {

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)'
    }}>

      <Navbar variant="client" />

      <main style={{
        paddingTop: 32,
        paddingBottom: 48
      }}>
        {children}
      </main>

    </div>
  )
}