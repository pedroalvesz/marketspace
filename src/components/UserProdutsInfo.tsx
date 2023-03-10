import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Icon, Text, VStack} from "native-base";

import { Feather } from '@expo/vector-icons';
import { useUserProducts } from "../hooks/useUserProducts";



export function UserProductsInfo({...rest} : TouchableOpacityProps) {

  const {products} = useUserProducts()

  return(
    <HStack width='100%' justifyContent='space-between' alignItems='center' bg='blue_secondary:alpha.30' py={3} px={4} rounded='md' mb={8}>

      <HStack alignItems='center'>
        <Icon
        as={Feather}
        name='tag'
        size={5}
        color='blue_primary'
        />
        <VStack ml={4}>
          <Heading fontFamily='heading' fontSize='xl' color='gray.2'>{products.filter(({is_active}) => is_active).length}</Heading>
          <Text fontFamily='body' fontSize='xs' color='gray.2'>active announces</Text>
        </VStack>
      </HStack>

      <TouchableOpacity {...rest}>
        <HStack alignItems='center'>
          <Text fontFamily='heading' fontSize='xs' color='blue_primary'>My announces</Text>
          <Icon
          as={Feather}
          name='arrow-right'
          size={5}
          color='blue_primary'
          />
        </HStack>
      </TouchableOpacity>
    </HStack>
  )
}