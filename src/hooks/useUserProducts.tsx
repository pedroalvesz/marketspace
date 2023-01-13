import {useContext} from 'react'
import { UserProductsContext } from '../contexts/UserProductsContext'

export function useUserProducts() {
  const context = useContext(UserProductsContext)

  return context
}