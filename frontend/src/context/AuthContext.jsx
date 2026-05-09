import { createContext, useState, useEffect, useCallback } from 'react'
import { authService } from '../services/authService'
import { storage } from '../utils/storage'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = storage.getUser()
    const token = storage.getToken()
    if (stored && token) {
      setUser(stored)
    }
    setLoading(false)
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password)
    storage.setToken(data.token)
    storage.setUser(data.user)
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (userData) => {
    const data = await authService.register(userData)
    storage.setToken(data.token)
    storage.setUser(data.user)
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(() => {
    storage.clear()
    setUser(null)
  }, [])

  const updateUser = useCallback((updated) => {
    const merged = { ...user, ...updated }
    storage.setUser(merged)
    setUser(merged)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}