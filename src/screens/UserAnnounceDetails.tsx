import { useState } from "react";
import { Heading, HStack, Icon, IconButton, ScrollView, Text, VStack } from "native-base";
import {useNavigation, useRoute} from '@react-navigation/native'
import {Feather, MaterialCommunityIcons} from '@expo/vector-icons'

import { ImagesCarousel } from "../components/ImageCarousel";
import { CustomButton } from "../components/CustomButton";
import { UserPhoto } from "../components/UserPhoto";
import { Tag } from "../components/Tag";

import { AppNavigationRouteProps } from "../routes/app.routes";
import { UserAnnounceDTO } from "../dtos/UserAnnounceDTO";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";


export function UserAnnounceDetails() {

  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)

  const navigation = useNavigation<AppNavigationRouteProps>()
  const {user, ErrorToast} = useAuth()

  const route = useRoute()
  const product = route.params as UserAnnounceDTO

  function handleGoBack() {
    navigation.goBack()
  }

  function handleEditAnnounce() {
    navigation.navigate('editAnnounce', product)
  }

  async function handleEnableOrDisableAnnounce() {
    try {
      setIsUpdating(true)
      
      const data = {
        is_active : !product.is_active
      }

      await api.patch(`/products/${product.id}`, data)

    } catch (error) {
      ErrorToast(user)
    } finally {
      setIsUpdating(false)
      handleGoBack()
    }
  }

  async function handleRemoveAnnounce() {
    try {
      setIsDeleting(true)

      await api.delete(`/products/${product.id}`)
    } catch (error) {
      ErrorToast(user)
    } finally {
      setIsDeleting(false)
      handleGoBack()
    }
  }

  return(
    <VStack flex={1} bg='gray.6' pt={16}>
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
        <IconButton
        onPress={handleEditAnnounce}
        icon={<Icon
          as={Feather}
          name='edit-3'
          size={7}
          color='gray.1'
          />}
        />
      </HStack>
      
      <ImagesCarousel images={product.product_images}/>

      <ScrollView flex={1} px={6} py={5} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 128}}>
        <HStack alignItems='center' mb={6}>
          <UserPhoto
          source={{uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
          />
          <Text fontFamily="body" fontSize="sm" color="gray.1" ml={2}>
            {user.name}
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
          <Icon as={MaterialCommunityIcons} name='cash-multiple' size={4} color='gray.2' mr={2} />
          <Text fontFamily='body' textTransform='capitalize' fontSize='sm' color='gray.2'>
            {method.name}
          </Text>
          </HStack>
        )}
        </VStack>

      </ScrollView>
      <VStack bg='white' alignItems='center' position='absolute' w='100%' h='125px' bottom={0} pt={2} pb={6} space={2}>
        <CustomButton
          name={product.is_active ? 'Disable Announce' : 'Enable Announce'}
          bg='gray.1'
          isBig
          leftIcon={<Icon as={Feather} name='power'/>}
          isLoading={isUpdating}
          onPress={handleEnableOrDisableAnnounce}
          />

          <CustomButton
          name='Delete Announce'
          bg='gray.5'
          textColor='gray.1'
          isBig
          mb={2}
          leftIcon={<Icon as={Feather} name='trash' color='gray.1'/>}
          isLoading={isDeleting}
          onPress={handleRemoveAnnounce}
          />
        </VStack>
    </VStack>
  )
}