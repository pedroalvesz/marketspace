import { Image } from 'native-base'
import { Dimensions } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { api } from '../services/api'


type imageProps = {
  path: string,
  id: string
}


type Props = {
  images: imageProps[] | string[],
}

export function ImagesCarousel({images} : Props) {
  const { width } = Dimensions.get('window')

  return (
      <Carousel
        loop
        autoPlay
        scrollAnimationDuration={1000}
        width={width}
        height={width / 1.5}
        data={images}
        renderItem={({ item }) => (
            <Image
              w={375}
              h={280}
              bgColor='gray.7'
              alignItems="center"
              justifyContent="center"
              source={{uri : item.path ? `${api.defaults.baseURL}/images/${item.path}` : item}}
              alt="selected product details"
            />
        )}
      />
  )
}
