import { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import { Checkbox, FlatList, Heading, HStack, Icon, IconButton, ScrollView, Switch, Text, VStack } from 'native-base'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import {AntDesign} from '@expo/vector-icons'

import BottomSheet from '@gorhom/bottom-sheet'

import { UserProductsInfo } from '../components/UserProdutsInfo'
import { HomeHeader } from '../components/HomeHeader'
import { ProductCard } from '../components/ProductCard'
import { SearchBar } from '../components/SearchBar'
import { CustomButton } from '../components/CustomButton'
import { Loading } from '../components/Loading'
import { Filters } from '../components/Filters'
import { Tag } from '../components/Tag'


import { HomeTabNavigationRouteProps } from '../routes/hometab.routes'
import { AppNavigationRouteProps } from '../routes/app.routes'
import { useAuth } from '../hooks/useAuth'

import { api } from '../services/api'
import { onSaleProductDTO } from '../dtos/onSaleProductDTO'



export function Dashboard() {
  const {user, ErrorToast} = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  const [userProducts, setUserProducts] = useState([])
  const [Products, setProducts] = useState<onSaleProductDTO[]>([])

  const [filterName, setFilterName] = useState('')
  const [isTradable, setIsTradable] = useState(true)
  const [isNew, setIsNew] = useState(true)
  const [paymentMethods, setPaymentMethods] = useState([])


  const tabNavigation = useNavigation<HomeTabNavigationRouteProps>()
  const stackNavigation = useNavigation<AppNavigationRouteProps>()

  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoints = useMemo(() => ['60%'] ,[]) 


  function handleOpenUserAnnounces() {
    tabNavigation.navigate('userAnnounces')
  }

  function handleOpenOnSaleProduct(id: string) {
    stackNavigation.navigate('sellerAnnoune', { id })
  }

  function handleOpenModal() {
    bottomSheetRef.current?.expand()
  }

  function handleCloseModal() {
    bottomSheetRef.current?.close()
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
    } catch (error) {
      ErrorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleFilterProducts() {
    try {
      const params = {
        query: filterName.trim() === '' ? null : filterName,
        is_new: isNew,
        accept_trade: isTradable,
        payment_methods: paymentMethods,
      }

     const {data} = await api.get('/products', {params})

      setProducts(data)

    } catch (error) {
      ErrorToast(error)
    }
  }
  
  async function handleFilterByName() {
    try {
      if(filterName.trim() === '') {
        fetchProducts()
      }
      const {data} = await api.get('/products', {params : {query: filterName}})

      setProducts(data)
    } catch (error) {
      ErrorToast(error)
    }
  }

  async function handleResetFilters() {
    try {
      setIsNew(true)
      setIsTradable(true)
      setPaymentMethods([])

      await fetchProducts()
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
     {
      isLoading
      ?
      <Loading/>
      :
      <>
      <HomeHeader name={user.name} avatar={user.avatar} />

      <Text fontFamily="body" fontSize="sm" color="gray.3" mb={3}>
        Your on sale products
      </Text>

      <UserProductsInfo quantity={userProducts.length} onPress={handleOpenUserAnnounces} />

      <Text fontFamily="body" fontSize="sm" color="gray.3" mb={3}>
        Products on sale
      </Text>

      <SearchBar
      value={filterName}
      onChangeText={setFilterName}
      rightElement={<Filters handleOpenModal={handleOpenModal} filter={handleFilterByName}/>}
      />

      <FlatList
        data={Products}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingBottom: 92 }}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <ProductCard
         onPress={() => handleOpenOnSaleProduct(item.id)}
         name={item.name}
         avatar={item.user.avatar}
         price={item.price}
         is_new={item.is_new}
         image={item.product_images[0].path}
         />}
      />

      <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose
      index={-1}
      >
      <VStack flex={1} px={6} pt={2}>
        <HStack justifyContent='space-between' alignItems='center'>
          <Heading fontFamily='heading' fontSize='xl' color='gray.1'>
            Filter Announces
          </Heading>

          <IconButton
          onPress={handleCloseModal}
          icon={<Icon
            as={AntDesign}
            name='close'
            size={6}
            color='gray.4'
          />}
          />
        </HStack>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 16}}>
          <Text fontFamily='heading' fontSize='sm' color='gray.2' mb={3}>
            Product Info
          </Text>
          
          <HStack space={2} mb={6}>
            <Tag
            name='new'
            isActive={isNew === true}
            onPress={() => setIsNew(true)}
            />
            <Tag
            name='used'
            isActive={isNew === false}
            onPress={() => setIsNew(false)}
            />
          </HStack>

          <Text fontFamily='heading' fontSize='sm' color='gray.2' mb={3}>
            Tradable?
          </Text>
            
          <Switch
          isChecked={isTradable}
          onToggle={() => setIsTradable(prevValue => !prevValue)}
          onTrackColor="blue_secondary"
          mb={6}
          />
          
          <Checkbox.Group accessibilityLabel="choose numbers" value={paymentMethods} onChange={setPaymentMethods} mb={6}>
            <Checkbox value='boleto' mb={1}>
              Bank Billing
            </Checkbox>
            <Checkbox value='pix' mb={1}>
              Pix
            </Checkbox>
            <Checkbox value='cash' mb={1}>
              Cash
            </Checkbox>
            <Checkbox value='card' mb={1}>
              Credit Card
            </Checkbox>
            <Checkbox value='deposit' mb={1}>
              Deposit
            </Checkbox>
          </Checkbox.Group>

          <HStack justifyContent='space-between'> 
            <CustomButton
            name='Reset Filters'
            bg='gray.5'
            textColor='gray.2'
            onPress={handleResetFilters}
            />
            <CustomButton
            name='Apply Filters'
            bg='gray.1'
            textColor='gray.7'
            onPress={handleFilterProducts}
            />
          </HStack>
        </ScrollView>
      </VStack>
      </BottomSheet>
      </>
     }
    </VStack>
  )
}
