import { HStack, Icon, Text, VStack } from "native-base";
import {useNavigation} from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'; 

import { CustomIconButton } from "./CustomIconButton";
import { AppNavigationRouteProps } from "../routes/app.routes";
import { UserPhoto } from "./UserPhoto";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";



export function HomeHeader() {

  const {user} = useAuth()
  const navigation = useNavigation<AppNavigationRouteProps>()

  function handleCreateAnnounce() {
    navigation.navigate('createAnnounce')
  }


  return(
    <HStack width='100%' justifyContent='space-between' alignItems='center' mb={6}>

      <HStack>
        <UserPhoto
        source={{uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
        size={12}
        />

        <VStack ml={2}>
          <Text fontFamily='body' fontSize='md' color='gray.1'>
            Welcome,
          </Text>
          <Text fontFamily='heading' fontSize='md' color='gray.1'>
            {user.name}!
          </Text>
        </VStack>
      </HStack>

      <CustomIconButton
        name='Announce'
        bg='gray.1'
        textColor='gray.7'
        leftIcon={<Icon as={FontAwesome5} name='plus'/>}
        onPress={handleCreateAnnounce}
        />
    </HStack>
  )
}