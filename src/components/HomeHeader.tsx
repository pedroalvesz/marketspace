import { HStack, Icon, Image, Text, VStack } from "native-base";
import {useNavigation} from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'; 

import { IconButton } from "./IconButton";
import { AppNavigationRouteProps } from "../routes/app.routes";



export function HomeHeader() {

  const navigation = useNavigation<AppNavigationRouteProps>()

  function handleCreateAnnounce() {
    navigation.navigate('createAnnounce')
  }
  return(
    <HStack width='100%' justifyContent='space-between' alignItems='center' mb={6}>

      <HStack>
        <Image
        source={require('../assets/DefaultUserPhoto.png')}
        borderWidth={2}
        borderColor='blue_secondary'
        rounded='full'
        size='48px'
        alt='User Photo'
        />

        <VStack ml={2}>
          <Text fontFamily='body' fontSize='md' color='gray.1'>
            Welcome,
          </Text>
          <Text fontFamily='heading' fontSize='md' color='gray.1'>
            Pedro!
          </Text>
        </VStack>
      </HStack>

      <IconButton
        name='Announce'
        bg='gray.1'
        textColor='gray.7'
        leftIcon={<Icon as={FontAwesome5} name='plus'/>}
        onPress={handleCreateAnnounce}
        />
    </HStack>
  )
}