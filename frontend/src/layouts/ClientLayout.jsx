import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function BarberLayout() {
  
  console.log('CLIENT LAYOUT RENDER')
  
  return (

    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* O Navbar fica APENAS aqui */}
      <Navbar variant="CLIENT" /> 

      <main style={{ paddingTop: 32, paddingBottom: 48 }}>
        <Outlet /> 
      </main>
    </div>
  );
}