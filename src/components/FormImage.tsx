import { Center, Circle, Image, IImageProps} from "native-base";
import {PencilSimpleLine} from 'phosphor-react-native'


export function FormImage({...rest} : IImageProps) {
  return(
    <Center>
      <Image
      source={require('../assets/DefaultUserPhoto.png')}
      alt='Select Your Photo'

      {...rest}
      />
      <Circle size={10} bg='blue_secondary' position='absolute' bottom={-5} right={-5}>
        <PencilSimpleLine size={16} color='white'/>
      </Circle>
    </Center>
  )
}