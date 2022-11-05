import jwtDecode from 'jwt-decode'
import { useContext } from 'react'
import { AppContext } from '../components/AppContext'

export const useDecodeToken = (): { exp: number } | null => {
  const { token } = useContext(AppContext)

  try {
    return jwtDecode<{ exp: number }>(token)
  } catch {
    return null
  }
}
