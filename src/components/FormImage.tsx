import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Center, Circle, Image, Icon, IImageProps} from "native-base";
import { Octicons } from '@expo/vector-icons';


type FormImageProps = TouchableOpacityProps & IImageProps

export function FormImage({...rest} : FormImageProps) {
  return(
    <TouchableOpacity {...rest}>
      <Center>
        <Image
        rounded='full'
        h='88px'
        w='88px'
        borderWidth={3}
        borderColor='blue_secondary'
        alt='Select Your Photo'
        {...rest}
        />

        <Circle size={10} bg='blue_secondary' position='absolute' bottom={-5} right={-5}>
          <Icon
          as={Octicons}
          name='pencil'
          size={4}
          color='gray.6'/>
        </Circle>
      </Center>
    </TouchableOpacity>
  )
}