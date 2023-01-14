import { useContext } from 'react'
import { AppContext } from '../contexts/AuthContext'

export function useAuth() {
  const context = useContext(AppContext)

  return context
}
