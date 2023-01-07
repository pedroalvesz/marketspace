import { Box, HStack, Text, View } from "native-base";



export function ProductTag() {
  return(
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
  )
}