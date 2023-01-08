import { HStack, Image, Text, VStack } from "native-base";


export function ProductCard() {
  return(
    <VStack maxW='155px' mb={6}>
      <VStack>
        <Image
        source={require('../assets/product.png')}
        h='100px'
        w='150px'
        rounded='md'
        alt='Product Image'
        />

        <SellerPhoto/>

        <HStack
        bg='blue_primary'
        rounded='full'
        position='absolute'
        px={2}
        right={2}
        top={1}
        >
          <Text fontFamily='heading' fontSize='sm' textTransform='uppercase' color='white'>
            Novo
          </Text>
        </HStack>
        
      </VStack>

      <Text fontFamily='body' fontSize='sm' color='gray.2'>
        Red Sneakers
      </Text>
      <Text fontFamily='heading' fontSize='md' color='gray.1'>
        R$ 100,00
      </Text>
    </VStack>
  )
}


function SellerPhoto() {
  return(
    <Image
    source={require('../assets/DefaultUserPhoto.png')}
    h={6}
    w={6}
    borderWidth={1}
    borderColor='gray.7'
    rounded='full'
    position='absolute'
    top={1}
    left={1}
    alt='Seller Photo'
    />
  )
}