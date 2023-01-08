import { Box, Heading, HStack, ScrollView, Text, VStack } from "native-base";
import {useNavigation} from '@react-navigation/native'

import { CustomButton } from "../components/CustomButton";
import { ImagesCarousel } from "../components/ImageCarousel";
import { AppNavigationRouteProps } from "../routes/app.routes";
import { UserPhoto } from "../components/UserPhoto";
import { Tag } from "../components/Tag";


export function PreviewAnnounce() {

  const navigation = useNavigation<AppNavigationRouteProps>()

  function handleGoBack() {
    navigation.goBack()
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

      <ImagesCarousel/>

      <ScrollView flex={1} px={6} py={5}>
        <HStack alignItems='center' mb={6}>
          <UserPhoto/>
          <Text fontFamily="body" fontSize="sm" color="gray.1" ml={2}>
            User Name
          </Text>
        </HStack>

        <Tag
        name='new'
        isActive={false}
        />

        <HStack justifyContent='space-between' my={2}>
          <Heading fontFamily='heading' fontSize='xl' color='gray.1'>
            Motorcycle
          </Heading>

          <HStack alignItems='center'>
            <Text fontFamily='heading' fontSize='sm' color='blue_secondary'>
              R$ 
            </Text>
            
            <Text fontFamily='heading' fontSize='xl' color='blue_secondary'>
            45,00
            </Text>
          </HStack>
        </HStack>

        <Text fontFamily='body' fontSize='sm' color='gray.2'>
          Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus.  
        </Text>

        <HStack alignItems='center' mt={6} mb={4}>
          <Text fontFamily='heading' fontSize='md' color='gray.2' mr={2}>
            Tradable ?
          </Text>

          <Text fontFamily='body' fontSize='sm' color='gray.2'>
            No.
          </Text>
        </HStack>

        <Text fontFamily='heading' fontSize='md' color='gray.2' mr={2}>
            Payment Methods:
        </Text>


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
        />
      </HStack>
    </VStack>
  )
}