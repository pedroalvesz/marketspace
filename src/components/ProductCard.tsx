import { HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { api } from "../services/api";
import { UserPhoto } from "./UserPhoto";

type Props = TouchableOpacityProps & {
  name: string,
  avatar: string,
  price: number,
  is_new: boolean,
  image?: string,
}

export function ProductCard({name, avatar, price, is_new, image, ...rest} : Props) {
  return(
    <TouchableOpacity {...rest} >
    <VStack maxW='155px' mb={6}>
      <VStack>
        <Image
        source={image ? {uri : `${api.defaults.baseURL}/images/${image}`} : require('../assets/product.png')}
        h='100px'
        w='150px'
        rounded='md'
        alt='Product Image'
        />

        <UserPhoto
        source={{uri: `${api.defaults.baseURL}/images/${avatar}`}}
        borderColor='gray.7'
        position='absolute'
        top={1}
        left={1}
        alt='Seller Photo'
        />

        <HStack
        bg={is_new ? 'blue_primary' : 'gray.5'}
        rounded='full'
        position='absolute'
        px={2}
        right={2}
        top={1}
        >
          <Text fontFamily='heading' fontSize='sm' textTransform='uppercase' color='white'>
            {is_new ? 'New' : 'Used'}
          </Text>
        </HStack>
        
      </VStack>

      <Text fontFamily='body' fontSize='sm' color='gray.2'>
        {name}
      </Text>
      <Text fontFamily='heading' fontSize='md' color='gray.1'>
        R$ {price}
      </Text>
    </VStack>
    </TouchableOpacity>
  )
}
