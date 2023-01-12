import { Box, Center, HStack, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { UserPhoto } from "./UserPhoto";
import { api } from "../services/api";

type Props = TouchableOpacityProps & {
  name: string,
  avatar?: string,
  price: number,
  is_new: boolean,
  image?: string,
  is_active?: boolean;
}

export function ProductCard({name, avatar, price, is_new, image, is_active = true, ...rest} : Props) {
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
          zIndex={-1}
          />
          {
            is_active
            ?
            null
            :
            <>
            <Box bg='gray.1' h='100px' w='150px' rounded='md' position='absolute' opacity={0.3} zIndex={1}/>
            <Text fontFamily='heading' fontSize='sm' textTransform='uppercase' color='gray.7' position='absolute' bottom={0} zIndex={2} left={2}>
            DISABLED
            </Text>
            </>
          }
          

           {
            avatar
            ?           
            <UserPhoto
            source={{uri: `${api.defaults.baseURL}/images/${avatar}`}}
            borderColor='gray.7'
            position='absolute'
            top={1}
            left={1}
            alt='Seller Photo'
            />
            :
            null
          }

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

      <Text
      fontFamily='body'
      fontSize='sm'
      color={is_active ? 'gray.2' : 'gray.4'}
      >
        {name}
      </Text>
      <Text
      fontFamily='heading' 
      fontSize='md' 
      color={is_active ? 'gray.1' : 'gray.4'}
      >
        R$ {price}
      </Text>
    </VStack>
    </TouchableOpacity>
  )
}
