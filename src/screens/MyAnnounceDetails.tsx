import { Heading, HStack, Icon, IconButton, ScrollView, Text, VStack } from "native-base";
import {useNavigation} from '@react-navigation/native'
import {Feather} from '@expo/vector-icons'
import { AppNavigationRouteProps } from "../routes/app.routes";
import { ImagesCarousel } from "../components/ImageCarousel";
import { UserPhoto } from "../components/UserPhoto";
import { Tag } from "../components/Tag";
import { CustomButton } from "../components/CustomButton";


export function MyAnnounceDetails() {

  const navigation = useNavigation<AppNavigationRouteProps>()

  function handleGoBack() {
    navigation.goBack()
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
        onPress={handleGoBack}
        icon={<Icon
          as={Feather}
          name='edit-3'
          size={7}
          color='gray.1'
          />}
        />
      </HStack>
      
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
            <Text fontFamily='heading' fontSize='sm' color='blue_secondary' mt={1} mr={1}>
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

        <VStack alignItems='center' space={2}>
        <CustomButton
          name='Unable Announce'
          bg='gray.1'
          color='gray.7'
          isBig
          />

          <CustomButton
          name='Delete Announce'
          bg='gray.5'
          color='gray.2'
          mb={2}
          isBig
          />
        </VStack>
      </ScrollView>
    </VStack>
  )
}