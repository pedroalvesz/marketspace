import { HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { UserPhoto } from "./UserPhoto";


export function ProductCard({...rest} : TouchableOpacityProps) {
  return(
    <TouchableOpacity {...rest} >
    <VStack maxW='155px' mb={6}>
      <VStack>
        <Image
        source={require('../assets/product.png')}
        h='100px'
        w='150px'
        rounded='md'
        alt='Product Image'
        />

        <UserPhoto
        borderColor='gray.7'
        position='absolute'
        top={1}
        left={1}
        alt='Seller Photo'
        />

        <HStack
        bg='blue_primary'
        rounded='full'
        position='absolute'
        px={2}
        right={2}
        top={1}
        >
          <Text fontFamily='heading' fontSize='sm' textTransform='uppercase' color='white'>
            Novo
          </Text>
        </HStack>
        
      </VStack>

      <Text fontFamily='body' fontSize='sm' color='gray.2'>
        Red Sneakers
      </Text>
      <Text fontFamily='heading' fontSize='md' color='gray.1'>
        R$ 100,00
      </Text>
    </VStack>
    </TouchableOpacity>
  )
}
