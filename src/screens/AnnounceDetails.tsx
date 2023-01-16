import { useCallback, useState } from "react";
import { Box, Button, Heading, HStack, Icon, IconButton, ScrollView, Text, useToast, VStack } from "native-base";
import {useNavigation, useRoute, useFocusEffect} from '@react-navigation/native'

import {Feather, MaterialCommunityIcons, FontAwesome} from '@expo/vector-icons'

import { ImagesCarousel } from "../components/ImageCarousel";
import { Loading } from "../components/Loading";
import { UserPhoto } from "../components/UserPhoto";
import { Tag } from "../components/Tag";

import { AppNavigationRouteProps } from "../routes/app.routes";

import { useUserProducts } from "../hooks/useUserProducts";
import { useAuth } from "../hooks/useAuth";

import { ProductDetailsDTO } from "../dtos/ProductDetails";
import { api } from "../services/api";
import { ErrorToast } from "../utils/ErrorToast";
import { CustomToast } from "../utils/CustomToast";
import { Linking } from "react-native";


type RouteParams = {
  id: string;
}

export function AnnounceDetails() {

  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [sendingMessage, setSendingMessage] = useState(false)
  const [product, setProduct] = useState<ProductDetailsDTO>({} as ProductDetailsDTO)

  const {reloadProducts, removeAnnounce } = useUserProducts()
  const {user} = useAuth()

  const navigation = useNavigation<AppNavigationRouteProps>()
  const route = useRoute()
  const { id } = route.params as RouteParams

  const toast = useToast()

  const isMyProduct = product.user_id === user.id

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleSendMessage() {
    setSendingMessage(true)
    try{
      Linking.openURL(`https://wa.me/${product.user.tel}`)
    } catch(error) {
      ErrorToast(error)
    } finally {
      setSendingMessage(false)
    }
  }

  async function fetchProductDetails() {
    try {
      const { data } = await api.get(`/products/${id}`)
      setProduct(data)
    } catch (error) {
      ErrorToast(error)
    } finally {
      setIsLoading(false)
    }
  }

  function handleEditAnnounce(){
    navigation.navigate('editAnnounce', product)
  }

  async function handleRemoveAnnounce() {
    try {
      setIsDeleting(true)
      await removeAnnounce(id)

      handleGoBack()
      CustomToast('success', 'Announce deleted successfully!')
    } catch (error) {
      ErrorToast(error)
    } finally {
      setIsDeleting(false)
    }
  }

  async function handleEnableOrDisableAnnounce() {
    try {
      setIsUpdating(true)
      
      const data = {
        is_active : !product.is_active
      }

      await api.patch(`/products/${product.id}`, data)
      await reloadProducts()
      handleGoBack()
    } catch (error) {
      ErrorToast(error)
    } finally {
      setIsUpdating(false)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchProductDetails()
  },[]))

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
        {isMyProduct && (
          <IconButton
            onPress={handleEditAnnounce}
            icon={<Icon
              as={Feather}
              name='edit-3'
              size={7}
              color='gray.1'
              />}
          />
        )}
      </HStack>

      <VStack>
        <ImagesCarousel images={product.product_images}/>
        {!product.is_active && (
          <VStack  h='100%' w='100%' justifyContent='center' alignItems='center' position='absolute' zIndex={1}>
            <Box bg='gray.1' h='100%' w='100%' opacity={0.7} rounded='md'/>
            <Text fontFamily='heading' fontSize='sm' color='gray.7' position='absolute' zIndex={2}>
              DISABLED
            </Text>
          </VStack>
         )
        }
      </VStack>

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
            {method.key}
          </Text>
          </HStack>
        )}
        </VStack>


      </ScrollView>
      
      {isMyProduct
      ?
      <VStack bg='white' alignItems='center' position='absolute' w='100%' h='130px' bottom={0} pt={2} pb={6} px={6} space={2}>
        <Button
        variant={product.is_active ? 'black' : 'blue'}
        w='full'
        leftIcon={<Icon as={Feather} name='power' color='white'/>}
        isLoading={isUpdating}
        onPress={handleEnableOrDisableAnnounce}
        >
          {product.is_active ? 'Disable Announce' : 'Enable Announce'}
        </Button>

        <Button
        variant='gray'
        w='full'        
        leftIcon={<Icon as={Feather} name='trash' color='gray.1'/>}
        isLoading={isDeleting}
        onPress={handleRemoveAnnounce}
        >
          Delete Announce
        </Button>
      </VStack>
      :
      <HStack bg='white' w='100%' position='absolute' bottom={0} h='90px' justifyContent='space-between' px={6} py={4} pb={6}>
        <HStack alignItems='center'>
          <Text fontFamily='heading' fontSize='sm' color='blue_secondary' mt={1} mr={2}>
            R$ 
          </Text>
            
          <Text fontFamily='heading' fontSize={24} color='blue_primary'>
            {product.price}
          </Text>
        </HStack>

        <Button
        variant='blue'
        leftIcon={<Icon as={FontAwesome} name='whatsapp' size={5} color='gray.7'/>}
        isLoading={sendingMessage}
        onPress={handleSendMessage}
        >
          Send Message
        </Button>
      </HStack>
      }
      </>
      }
    </VStack>
  )
}