import {HStack, IPressableProps, Pressable, Text, } from "native-base";

import { Ionicons } from '@expo/vector-icons';


type TagProps = IPressableProps & {
  name: string;
  isActive: boolean;

}
export function Tag({name, isActive, ...rest} : TagProps) {
  return(
    <Pressable
    bg={isActive ? 'blue_secondary' : 'gray.5'}
    rounded='full'
    w={66}
    py={1}
    justifyContent='center'
    
    {...rest}
    >
      <Text
      fontFamily='heading'
      fontSize='sm'
      textTransform='uppercase'
      textAlign='center'
      color={isActive ? 'white' : 'gray.3'}
      >
        {name}
      </Text>
    </Pressable>
  )
}