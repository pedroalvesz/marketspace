import { useEffect, useState } from "react";
import { Heading, HStack, Icon, IconButton, ScrollView, Text, VStack } from "native-base";
import {useNavigation, useRoute} from '@react-navigation/native'

import {Feather, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons'

import { ImagesCarousel } from "../components/ImageCarousel";
import { CustomIconButton } from "../components/CustomIconButton";
import { Loading } from "../components/Loading";
import { UserPhoto } from "../components/UserPhoto";
import { Tag } from "../components/Tag";

import { AppNavigationRouteProps } from "../routes/app.routes";
import { onSaleDetailsDTO } from "../dtos/onSaleDetailsDTO";

import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";


type RouteParams = {
  id: number
}

export function SellerAnnounce() {

  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<onSaleDetailsDTO>({} as onSaleDetailsDTO)

  const {ErrorToast} = useAuth()
  const navigation = useNavigation<AppNavigationRouteProps>()

  const route = useRoute()
  const { id } = route.params as RouteParams

  function handleGoBack() {
    navigation.goBack()
  }

  async function getProductDetails() {
    try {
      const { data } = await api.get(`/products/${id}`)
      setProduct(data)
    } catch (error) {
      ErrorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getProductDetails()
  },[])

  return(
    <VStack flex={1} bg='gray.6' pt={16}>
      {isLoading
      ?
      <Loading/>
      :
      <>
      <HStack width='full' alignItems='center' justifyContent='space-between' px={6} mb={3}>
        <IconButton
        onPress={handleGoBack}
        icon={<Icon
          as={Feather}
          name='arrow-left'
          size={7}
          color='gray.1'
          />}
        />
      </HStack>
      
      <ImagesCarousel images={product.product_images}/>

      <ScrollView flex={1} px={6} py={5} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 128}}>
        <HStack alignItems='center' mb={6}>
          <UserPhoto
          source={{uri: `${api.defaults.baseURL}/images/${product.user.avatar}`}}
          />
          <Text fontFamily="body" fontSize="sm" color="gray.1" ml={2}>
            {product.user.name}
          </Text>
        </HStack>

        <Tag
        name={product.is_new ? 'new' : 'used'}
        isActive={false}
        />

        <HStack justifyContent='space-between' my={2}>
          <Heading fontFamily='heading' fontSize='xl' color='gray.1'>
            {product.name}
          </Heading>

          <HStack alignItems='center'>
            <Text fontFamily='heading' fontSize='sm' color='blue_secondary' mt={1} mr={1}>
              R$ 
            </Text>
            
            <Text fontFamily='heading' fontSize='xl' color='blue_secondary'>
            {product.price}
            </Text>
          </HStack>
        </HStack>

        <Text fontFamily='body' fontSize='sm' color='gray.2'>
        {product.description}  
        </Text>

        <HStack alignItems='center' mt={6} mb={4}>
          <Text fontFamily='heading' fontSize='md' color='gray.2' mr={2}>
            Tradable ?
          </Text>

          <Text fontFamily='body' fontSize='sm' color='gray.2'>
            {product.accept_trade ? 'Yes.' : 'No.'}
          </Text>
        </HStack>

        <Text fontFamily='heading' fontSize='md' color='gray.2' mr={2}>
            Payment Methods:
        </Text>

        <VStack mt={2} mb={12}>
        {product.payment_methods.map(method =>
          <HStack alignItems='center' key={method.key}>
          <Icon as={MaterialCommunityIcons} name='cash-multiple' size={4} color='gray.2' mr={2}/>
          <Text fontFamily='body' textTransform='capitalize' fontSize='sm' color='gray.2'>
            {method.name}
          </Text>
          </HStack>
        )}
        </VStack>


      </ScrollView>

      <HStack bg='white' w='100%' position='absolute' bottom={0} h='90px' justifyContent='space-between' px={6} py={4} pb={6}>
        <HStack alignItems='center'>
          <Text fontFamily='heading' fontSize='sm' color='blue_secondary' mt={1} mr={2}>
            R$ 
          </Text>
            
          <Text fontFamily='heading' fontSize={24} color='blue_primary'>
            {product.price}
          </Text>
        </HStack>

        <CustomIconButton
        name='Send Message'
        bg='blue_primary'
        leftIcon={<Icon as={FontAwesome} name='whatsapp' size={5}/>}
        textColor='gray.7'
        />
      </HStack>
      </>
      }
    </VStack>
  )
}