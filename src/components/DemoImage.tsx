import { Image, VStack, IImageProps, Icon} from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';


export function DemoImage({...rest} : IImageProps & TouchableOpacityProps) {
  return(
    <VStack>
      <Image
      alt='image example'
      h='100px'
      w='100px'
      rounded='md'
      mr={2}

      {...rest}
      />
      <TouchableOpacity
      style={{position: 'absolute', top: 3, right: 11}}
      {...rest}>
      <Icon
      as={MaterialIcons}
      name='cancel'
      size={5}
      color='gray.2'
      />
      </TouchableOpacity>
    </VStack>
  )
}