import {Button, Heading, HStack, Icon, ScrollView, Text, VStack } from "native-base";
import {useNavigation, useRoute} from '@react-navigation/native'

import { MaterialCommunityIcons, Feather} from '@expo/vector-icons';

import { ImagesCarousel } from "../components/ImageCarousel";
import { UserPhoto } from "../components/UserPhoto";
import { Tag } from "../components/Tag";

import { AppNavigationRouteProps } from "../routes/app.routes";
import { useAuth } from "../hooks/useAuth";
import { useUserProducts } from "../hooks/useUserProducts";
import { ErrorToast } from "../utils/ErrorToast";

import { CreateAnnounceDTO } from "../dtos/CreateAnnounceDTO";
import { CustomToast } from "../utils/CustomToast";



export function PreviewAnnounce() {

  const {user} = useAuth()
  const {createAnnounce} = useUserProducts()
  const navigation = useNavigation<AppNavigationRouteProps>()

  const route = useRoute()
  const product = route.params as CreateAnnounceDTO

  function handleGoBack() {
    navigation.goBack()
  }

  async function handleAnnounce() {
    try {
      await createAnnounce(product)

      navigation.navigate('hometabs')
      CustomToast('success', 'Announce created successfully!')
      
    } catch (error) {
      ErrorToast(error)
    }
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

      <ImagesCarousel images={product.images}/>

      <ScrollView flex={1} px={6} py={5} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 128}}>
        <HStack alignItems='center' mb={6}>
          <UserPhoto/>
          <Text fontFamily="body" fontSize="sm" color="gray.1" ml={2}>
            {user.name}
          </Text>
        </HStack>

        <Tag
        name={product.is_new ? 'New' : 'Used'}
        isActive={false}
        />

        <HStack justifyContent='space-between' alignItems='center' my={2}>
          <Heading fontFamily='heading' fontSize='xl' color='gray.1'>
            {product.name}
          </Heading>

          <HStack alignItems='center'>
            <Text fontFamily='heading' fontSize='sm' color='blue_secondary'>
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
        
        <VStack mt={2}>
        {product.payment_methods.map(method =>
          <HStack alignItems='center' key={method}>
          <Icon as={MaterialCommunityIcons} name='cash-multiple' size={4} color='gray.2' mr={2}/>
          <Text fontFamily='body' textTransform='capitalize' fontSize='sm' color='gray.2'>
            {method}
          </Text>
          </HStack>
        )}
        </VStack>


      </ScrollView>

      <HStack bg='white' w='100%' position='absolute' bottom={0} h='90px' justifyContent='space-between' px={6} py={4} pb={6}>
      <Button
      variant='gray'
      w='48%'
      leftIcon={<Icon as={Feather} name='arrow-left' size={4} color='gray.2' mr={1}/>}
      onPress={handleGoBack}
      >
       Back to Edit
      </Button>
      <Button
      alignItems='center'
      variant='blue'
      w='48%'
      leftIcon={<Icon as={Feather} name='tag' size={4} color='gray.7' mr={1}/>}
      onPress={handleAnnounce}
      >
        Announce
      </Button>
      </HStack>
    </VStack>
  )
}