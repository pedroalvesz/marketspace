import {Heading, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import {useNavigation, useRoute} from '@react-navigation/native'

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { CustomButton } from "../components/CustomButton";
import { ImagesCarousel } from "../components/ImageCarousel";
import { UserPhoto } from "../components/UserPhoto";
import { Tag } from "../components/Tag";

import { AppNavigationRouteProps } from "../routes/app.routes";
import { CreateAnnounceDTO } from "../dtos/CreateAnnounceDTO";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";


export function PreviewAnnounce() {

  const {user} = useAuth()
  const navigation = useNavigation<AppNavigationRouteProps>()

  const route = useRoute()
  const {data} = route.params as CreateAnnounceDTO

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleAnnounce() {

    const {images, name, description, is_new, price, accept_trade, payment_methods} = data;
    const response = await api.post('/products', {name, description, is_new, price, accept_trade, payment_methods});

    console.log('Envio do Produto =>', response.data)
    const {id} = response.data

    await postImages(id, name, images)
  }


  async function postImages(id: string, name: string, images: string[]) {

    const imageData = new FormData()
    imageData.append('product_id', id)

    images.forEach((item) => {
      const imageExtension = item.split('.').pop()

      const imageFile = {
        name: `${name}.${imageExtension}`,
        uri: item,
        type: `image/${imageExtension}`
      } as any

      imageData.append('images', imageFile)
    })

    const response = await api.post('/products/images/', imageData, {headers: {'Content-Type' : 'multipart/form-data'}})

    console.log('Envio das Images =>',response.data)

  }

  return(
    <VStack flex={1} bg='gray.6'>
      <VStack bg='blue_secondary' justifyContent='center' alignItems='center' pt={16} pb={4}>
        <Heading fontFamily='heading' fontSize='md' color='gray.7' >
          Announce Preview
        </Heading>

        <Text fontFamily='body' fontSize='sm' color='gray.7'>
          This is how your product will be listed!
        </Text>
      </VStack>

      <ImagesCarousel images={data.images}/>

      <ScrollView flex={1} px={6} py={5}>
        <HStack alignItems='center' mb={6}>
          <UserPhoto/>
          <Text fontFamily="body" fontSize="sm" color="gray.1" ml={2}>
            {user.name}
          </Text>
        </HStack>

        <Tag
        name={data.is_new ? 'New' : 'Used'}
        isActive={false}
        />

        <HStack justifyContent='space-between' alignItems='center' my={2}>
          <Heading fontFamily='heading' fontSize='xl' color='gray.1'>
            {data.name}
          </Heading>

          <HStack alignItems='center'>
            <Text fontFamily='heading' fontSize='sm' color='blue_secondary'>
              R$ 
            </Text>
            
            <Text fontFamily='heading' fontSize='xl' color='blue_secondary'>
            {data.price}
            </Text>
          </HStack>
        </HStack>

        <Text fontFamily='body' fontSize='sm' color='gray.2'>
          {data.description}  
        </Text>

        <HStack alignItems='center' mt={6} mb={4}>
          <Text fontFamily='heading' fontSize='md' color='gray.2' mr={2}>
            Tradable ?
          </Text>

          <Text fontFamily='body' fontSize='sm' color='gray.2'>
            {data.accept_trade ? 'Yes.' : 'No.'}
          </Text>
        </HStack>

        <Text fontFamily='heading' fontSize='md' color='gray.2' mr={2}>
            Payment Methods:
        </Text>
        
        <VStack mt={2}>
        {data.payment_methods.map(method =>
          <HStack alignItems='center'>
          <Icon as={MaterialCommunityIcons} name='cash-multiple' size={4} color='gray.2' mr={2}/>
          <Text fontFamily='body' textTransform='capitalize' fontSize='sm' color='gray.2'>
            {method}
          </Text>
          </HStack>
        )}
        </VStack>


      </ScrollView>

      <HStack bg='white' w='100%' position='absolute' bottom={0} h='90px' justifyContent='space-between' px={6} py={4} pb={6}>
        <CustomButton
        name='Back'
        bg='gray.5'
        textColor='gray.2'
        onPress={handleGoBack}
        />

        <CustomButton
        name='Announce'
        bg='blue_secondary'
        textColor='gray.7'
        onPress={handleAnnounce}
        />
      </HStack>
    </VStack>
  )
}