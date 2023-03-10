import { useCallback, useState } from "react";
import { HStack, Icon, VStack, IconButton, Heading, Text, Select, FlatList } from "native-base";
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import {AntDesign} from '@expo/vector-icons'


import { ProductCard } from "../components/ProductCard";
import { SkeletonCard } from "../components/SkeletonCard";

import { AppNavigationRouteProps } from "../routes/app.routes";
import { UserAnnounceDTO } from "../dtos/UserAnnounceDTO";
import { api } from "../services/api";
import { ErrorToast } from "../utils/ErrorToast";


export function UserAnnounces() {

  const [loading, setLoading] = useState(true)
  const [selectFilter, setSelectFilter] = useState('all')
  const [userProducts, setUserProducts] = useState<UserAnnounceDTO[]>([])

  const navigation = useNavigation<AppNavigationRouteProps>()


  const filteredProducts = handleFilterAnnounces(selectFilter)

  function handleCreateAnnounce() {
    navigation.navigate('createAnnounce')
  }

  function handleUserAnnounceDetails(item : UserAnnounceDTO) {
    navigation.navigate('announceDetails', item)
  }

  function handleFilterAnnounces(value: string) {
    if(value === 'active') {
      return userProducts.filter(({is_active}) => is_active === true )
    }

    if(value === 'inactive') {
      return userProducts.filter(({is_active}) => is_active === false )
    }

    return userProducts;
  }

  async function fetchUserAnnounces() {
    try {
      const {data} = await api.get('/users/products')

      setUserProducts(data)
      return data
    } catch (error) {
      ErrorToast(error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchUserAnnounces()
  },[]))

  return(
    <VStack flex={1} bg='gray.6' pt={16} px={6}>
      <HStack width='full' alignItems='center' justifyContent='space-between' mb={10}>
        <Heading fontFamily='heading' fontSize='xl' color='gray.1' flex={1} textAlign="center" ml={12}>
          My Announces
        </Heading>
        <IconButton
        icon={<Icon
          as={AntDesign}
          name='plus'
          size={7}
          color='gray.1'
          onPress={handleCreateAnnounce}
          />}
        />
      </HStack>

      <HStack alignItems='center' justifyContent='space-between' mb={5}>
        <Text fontFamily='body' fontSize='sm' color='gray.2'>
          {filteredProducts.length} announces
        </Text>
        
        <Select selectedValue={selectFilter} onValueChange={value => setSelectFilter(value)} minW='110px'>
          <Select.Item label='All' value='all'/>
          <Select.Item label='Active' value='active'/>
          <Select.Item label='Inactive' value='inactive'/>
        </Select>
      </HStack>

      <FlatList
      data={filteredProducts}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      contentContainerStyle={{paddingBottom: 92}}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => {
        if(!loading) {
          return (
            <ProductCard
            onPress={() => handleUserAnnounceDetails(item)}
            is_active={item.is_active}
            image={item.product_images[0].path}
            name={item.name}
            price={item.price}
            is_new={item.is_new}
            />
          )
        }
        return <SkeletonCard/>
      }}
      />
    </VStack>
  )
}