import { useState, useRef, useMemo } from 'react'
import { FlatList, Text, VStack } from 'native-base'
import { useNavigation } from '@react-navigation/native'

import BottomSheet from '@gorhom/bottom-sheet'

import { HomeHeader } from '../components/HomeHeader'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { UserProductsInfo } from '../components/UserProdutsInfo'

import { Filters } from '../components/Filters'
import { FilterModal } from '../components/FilterModal'

import { HomeTabNavigationRouteProps } from '../routes/hometab.routes'



export function Dashboard() {
  const [Products, setProducts] = useState(['1', '2', '3', '4', '5', '6'])

  const navigation = useNavigation<HomeTabNavigationRouteProps>()

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['60%'] ,[]) 


  function handleOpenUserAnnounces() {
    navigation.navigate('userAnnounces')
  }

  function handleModal() {
    bottomSheetRef.current?.expand()
  }


  return (
    <VStack flex={1} bg="gray.6" pt={16} px={6}>
      <HomeHeader />

      <Text fontFamily="body" fontSize="sm" color="gray.3" mb={3}>
        Your on sale products
      </Text>

      <UserProductsInfo onPress={handleOpenUserAnnounces} />

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
        renderItem={item => <ProductCard />}
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
