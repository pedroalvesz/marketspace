import { Image } from 'native-base'
import * as React from 'react'
import { Dimensions, Text } from 'react-native'
import { View } from 'native-base'
import Carousel from 'react-native-reanimated-carousel'

export function ImagesCarousel() {
  const { width } = Dimensions.get('window')

  const [images, setImages] = React.useState([
    'https://source.unsplash.com/random/900×700/?fruit',
    'https://source.unsplash.com/random/900×700/?fruit',
    'https://source.unsplash.com/random/900×700/?fruit'
  ])

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
              bgColor="gray.7"
              alignItems="center"
              justifyContent="center"
              source={{
                uri: item
              }}
              alt="selected product details"
            />
        )}
      />
  )
}
