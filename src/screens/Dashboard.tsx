import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { FlatList, Text, VStack } from 'native-base'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import BottomSheet from '@gorhom/bottom-sheet'

import { HomeHeader } from '../components/HomeHeader'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { UserProductsInfo } from '../components/UserProdutsInfo'

import { Filters } from '../components/Filters'
import { FilterModal } from '../components/FilterModal'

import { HomeTabNavigationRouteProps } from '../routes/hometab.routes'
import { AppNavigationRouteProps } from '../routes/app.routes'
import { api } from '../services/api'
import { useAuth } from '../hooks/useAuth'



export function Dashboard() {
  const {user, ErrorToast} = useAuth()
  const [userProducts, setUserProducts] = useState([])
  const [Products, setProducts] = useState([])

  const tabNavigation = useNavigation<HomeTabNavigationRouteProps>()
  const stackNavigation = useNavigation<AppNavigationRouteProps>()

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['60%'] ,[]) 


  function handleOpenUserAnnounces() {
    tabNavigation.navigate('userAnnounces')
  }

  function HandleOpenSellerAnnounce() {
    stackNavigation.navigate('sellerAnnoune')
  }

  function handleModal() {
    bottomSheetRef.current?.expand()
  }



  async function fetchUserProducts() {
    try {
      const { data } = await api.get('/users/products')
      setUserProducts(data)
    } catch (error) {
      ErrorToast(error)
    }
  }

  async function fetchProducts() {
    try {
      const { data } = await api.get('/products')

      setProducts(data)
      console.log('all products',data)
    } catch (error) {
      ErrorToast(error)
    }
  }


  useEffect(() => {
    fetchUserProducts()
  },[])

  useFocusEffect(useCallback(() => {
    fetchProducts()
  },[]))

  return (
    <VStack flex={1} bg="gray.6" pt={16} px={6}>
      <HomeHeader name={user.name} avatar={user.avatar} />

      <Text fontFamily="body" fontSize="sm" color="gray.3" mb={3}>
        Your on sale products
      </Text>

      <UserProductsInfo quantity={userProducts.length} onPress={handleOpenUserAnnounces} />

      <Text fontFamily="body" fontSize="sm" color="gray.3" mb={3}>
        Products on sale
      </Text>

      <SearchBar
      rightElement={<Filters onPress={handleModal}/>}
      />

      <FlatList
        data={Products}
        keyExtractor={item => item}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 92 }}
        showsVerticalScrollIndicator={false}
        renderItem={item => <ProductCard onPress={HandleOpenSellerAnnounce}/>}
      />

      <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      >
        <FilterModal/>
      </BottomSheet>
    </VStack>
  )
}
