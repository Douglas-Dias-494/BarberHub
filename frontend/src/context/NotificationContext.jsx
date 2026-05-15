import { createContext, useState, useCallback, useRef, useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { wsService } from '../services/websocket'

export const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [toasts, setToasts] = useState([])
  const toastIdRef = useRef(0)

  // Connect WebSocket for barbers
  useEffect(() => {

    if (user?.role === 'BARBER') {
      wsService.connect(user.id, (notification) => {
        addNotification(notification)
        showToast(
          `📅 Novo agendamento de ${notification.clientName}`,
          'info',
          6000
        )
      })
    }
    return () => wsService.disconnect()
  }, [user])

  const addNotification = useCallback((notification) => {
    setNotifications(prev => [
      { ...notification, id: Date.now(), read: false },
      ...prev
    ])
  }, [])

  const markAsRead = useCallback((id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const showToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = ++toastIdRef.current
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <NotificationContext.Provider value={{
      notifications,
      toasts,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      showToast,
      removeToast
    }}>
      {children}
    </NotificationContext.Provider>
  )
}