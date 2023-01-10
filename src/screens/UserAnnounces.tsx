import { useCallback, useState } from "react";
import { HStack, Icon, VStack, IconButton, Heading, Text, Select, FlatList } from "native-base";
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import {AntDesign} from '@expo/vector-icons'


import { ProductCard } from "../components/ProductCard";
import { AppNavigationRouteProps } from "../routes/app.routes";
import { api } from "../services/api";
import { UserAnnounceDTO } from "../dtos/UserAnnounceDTO";
import { useAuth } from "../hooks/useAuth";


export function UserAnnounces() {

  const [selectFilter, setSelectFilter] = useState('')
  const [userProducts, setUserProducts] = useState<UserAnnounceDTO[]>([])

  const {user} = useAuth()
  const navigation = useNavigation<AppNavigationRouteProps>()

  function handleCreateAnnounce() {
    navigation.navigate('createAnnounce')
  }

  function handleUserAnnounceDetails(item : UserAnnounceDTO) {
    navigation.navigate('userAnnounceDetails', item)
  }


  async function fetchUserAnnounces() {
    try {
      const {data} = await api.get('/users/products')

      setUserProducts(data)
    } catch (error) {
      
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
          {userProducts.length} announces
        </Text>
        
        <Select placeholder="All" selectedValue={selectFilter} onValueChange={itemValue => setSelectFilter(itemValue)} minW='110px'>
          <Select.Item label='All' value='all'/>
          <Select.Item label='Active' value='active'/>
          <Select.Item label='Inactive' value='inactive'/>
        </Select>
      </HStack>

      <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      contentContainerStyle={{paddingBottom: 92}}
      showsVerticalScrollIndicator={false}
      renderItem={({item}) => <ProductCard
        onPress={() => handleUserAnnounceDetails(item)}
        image={item.product_images[0].path}
        avatar={user.avatar}
        name={item.name}
        price={item.price}
        is_new={item.is_new}
        />}
      />
    </VStack>
  )
}