import { IImageProps, Image } from "native-base";


export function UserPhoto({ ...rest} : IImageProps) {
  return(
    <Image
    source={require('../assets/DefaultUserPhoto.png')}
    size={6}
    borderWidth={2}
    borderColor='blue_secondary'
    rounded='full'
    alt='User Photo'
    {...rest}
    />
  )
}