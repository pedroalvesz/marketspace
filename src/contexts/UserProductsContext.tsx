import {createContext, ReactNode, useCallback, useEffect, useState} from 'react'
import { useToast } from 'native-base'
import { EditAnnounceDTO } from '../dtos/EditAnnounceDTO'
import { UserAnnounceDTO } from '../dtos/UserAnnounceDTO'
import { useAuth } from '../hooks/useAuth'
import { api } from '../services/api'
import { CreateAnnounceDTO } from '../dtos/CreateAnnounceDTO'


type UserProductsDataProps = {
  products: UserAnnounceDTO[];
  removeProduct: (id: string) => Promise<void>;
  editAnnounce: (product: CreateAnnounceDTO, productId: string, deletedImages: string[], oldImages: productImages[]) => Promise<void>;
  reloadProducts: () => Promise<void>;
  postImages: (id: string, images: string[]) => Promise<void>;
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

  async function editAnnounce(product: CreateAnnounceDTO, productId: string, deletedImages: string[], oldImages: productImages[]) {
    try {
      if(product.images.length + oldImages.length === 0 || product.payment_methods.length === 0 || product.name.trim() === '' || product.description.trim() === '' || product.price === null) {
        return toast.show({
          title: 'Please fill out all fields.',
          bg: 'yellow.400',
          placement: 'top',
          mx: 4,
        })
      }

      const data = {
        name: product.name,
        description: product.description,
        is_new: product.is_new,
        price: product.price,
        accept_trade: product.accept_trade,
        payment_methods: product.payment_methods
      }

      await api.put(`/products/${productId}`, data)

      if(oldImages.length === 3) {
        return;
      }

      await updateImages(deletedImages, product.images, productId)
    } catch (error) {
      throw error
    }
  }

  async function updateImages(deletedImages: string[], images: string[], productId: string ) {
    try {

      if(deletedImages.length > 0) {
        await api.delete('/products/images/', {data : {productImagesIds: deletedImages}})
      }
      
      if(images.length > 0) {
        await postImages(productId, images)
      }
    } catch (error) {
      
    }
  }

  async function postImages(productId: string, images: string[]) {
    try {
      const imageData = new FormData()
      imageData.append('product_id', productId)
  
      images.forEach((item) => {
        const imageExtension = item.split('.').pop()
  
        const imageFile = {
          name: `${user.name}.${imageExtension}`,
          uri: item,
          type: `image/${imageExtension}`
        } as any
  
        imageData.append('images', imageFile)
      })
  
      await api.post('/products/images/', imageData, {headers: {'Content-Type' : 'multipart/form-data'}})

    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    fetchUserProducts()
  })


  return(
    <UserProductsContext.Provider value={{products, removeProduct, editAnnounce, reloadProducts, postImages}}>
      {children}
    </UserProductsContext.Provider>
  )
}