import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import NotFound from '../pages/NotFound'
import ClientLayout from '../layouts/ClientLayout'
import BarberLayout from '../layouts/BarberLayout'

import Home from '../pages/client/Home'
import BarberDetails from '../pages/client/BarberDetails'
import ScheduleAppointment from '../pages/client/ScheduleAppointment'
import MyAppointments from '../pages/client/MyAppointments'

import Dashboard from '../pages/barber/Dashboard'
import MyShop from '../pages/barber/MyShop'
import CreateService from '../pages/barber/CreateService'
import Appointments from '../pages/barber/Appointments'

import PrivateRoute from './PrivateRoute'
import BarberRoute from './BarberRoute'
import Loading from '../components/Loading'

export default function AppRoutes() {
  const { loading } = useAuth()

  if (loading) return <Loading fullScreen />

  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Client routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/barbershops/:id" element={<BarberDetails />} />
          <Route path="/barbershops/:id/schedule" element={<ScheduleAppointment />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
        </Route>
      </Route>

      {/* Barber routes */}
      <Route element={<BarberRoute />}>
        <Route element={<BarberLayout />}>
          <Route path="/barber/dashboard" element={<Dashboard />} />
          <Route path="/barber/shop" element={<MyShop />} />
          <Route path="/barber/services" element={<CreateService />} />
          <Route path="/barber/appointments" element={<Appointments />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}