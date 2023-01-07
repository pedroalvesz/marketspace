import { Center, Circle, Image, IImageProps, Icon} from "native-base";
import { Octicons } from '@expo/vector-icons';


export function FormImage({...rest} : IImageProps) {
  return(
    <Center>
      <Image
      source={require('../assets/DefaultUserPhoto.png')}
      alt='Select Your Photo'

      {...rest}
      />
      <Circle size={10} bg='blue_secondary' position='absolute' bottom={-5} right={-5}>
        <Icon
        as={Octicons}
        name='pencil'
        size={16}
        color='gray.1'/>
      </Circle>
    </Center>
  )
}