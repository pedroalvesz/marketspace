import { Button, HStack, Icon, Image, Text, VStack } from "native-base";
import { IconButton } from "./IconButton";
import { FontAwesome5 } from '@expo/vector-icons'; 


export function HomeHeader() {
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
        />
    </HStack>
  )
}