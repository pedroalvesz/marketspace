import {createContext, ReactNode, useEffect, useState} from 'react'
import { UserAnnounceDTO } from '../dtos/UserAnnounceDTO'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'


type UserProductsDataProps = {
  products: UserAnnounceDTO[];
}

export const UserProductsContext = createContext<UserProductsDataProps>({} as UserProductsDataProps)


type Props = {
  children: ReactNode;
}

export function UserProductsProvider({children}: Props) {

  const {user} = useAuth()
  const [products, setProducts] = useState<UserAnnounceDTO[]>([])


  async function fetchUserProducts() {
    try {
      const { data } = await api.get('/users/products')
      setProducts(data)
    } catch (error) {

    } 
  }

  useEffect(() => {
    fetchUserProducts()
  },[user.id])

  return(
    <UserProductsContext.Provider value={{products}}>
      {children}
    </UserProductsContext.Provider>
  )
}