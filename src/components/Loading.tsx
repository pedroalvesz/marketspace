import { Center, Spinner } from "native-base";


export function Loading() {
  return(
    <Center flex={1}>
      <Spinner mt={8} size='lg' color='gray.1'/>
    </Center>
  )
}