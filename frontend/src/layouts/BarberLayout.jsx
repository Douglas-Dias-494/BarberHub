import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function BarberLayout() {
    
  return (

    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* O Navbar fica APENAS aqui */}
      <Navbar variant="BARBER" /> 

      <main style={{ paddingTop: 32, paddingBottom: 48 }}>
        <Outlet /> 
      </main>
    </div>
  );
}