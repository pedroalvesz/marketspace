import {createContext, ReactNode, useCallback, useEffect, useState} from 'react'
import { useToast } from 'native-base'
import { EditAnnounceDTO } from '../dtos/EditAnnounceDTO'
import { UserAnnounceDTO } from '../dtos/UserAnnounceDTO'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'


type UserProductsDataProps = {
  products: UserAnnounceDTO[];
  removeProduct: (id: string) => Promise<void>;
  editAnnounce: (product: EditAnnounceDTO, id: string ) => Promise<void>;
  reloadProducts: () => Promise<void>;
}

export const UserProductsContext = createContext<UserProductsDataProps>({} as UserProductsDataProps)


type Props = {
  children: ReactNode;
}

export function UserProductsProvider({children}: Props) {

  const {user} = useAuth()
  const [products, setProducts] = useState<UserAnnounceDTO[]>([])

  const toast = useToast()

  async function reloadProducts() {
    await fetchUserProducts()
  }

  async function fetchUserProducts() {
    try {
      const { data } = await api.get('/users/products')
      setProducts(data)
    } catch (error) {

    } 
  }

  async function removeProduct(id: string) {
    try {
      await api.delete(`/products/${id}`)
    } catch (error) {
      console.log(error.message)
    }
  }

  async function editAnnounce(product: EditAnnounceDTO, id: string ) {
    try {
      if(product.images.length === 0 || product.payment_methods.length === 0 || product.name.trim() === '' || product.description.trim() === '' || !!product.price) {
        return toast.show({
          title: 'Please fill out all fields.',
          bg: 'yellow.400',
          placement: 'top',
          mx: 4,
        })
      }

      await api.put(`/products/${id}`, product)
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchUserProducts()
  })


  return(
    <UserProductsContext.Provider value={{products, removeProduct, editAnnounce, reloadProducts}}>
      {children}
    </UserProductsContext.Provider>
  )
}