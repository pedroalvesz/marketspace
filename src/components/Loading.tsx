import { Center, Spinner } from "native-base";


export function Loading() {
  return(
    <Center flex={1} bg='gray.6'>
      <Spinner size={64}/>
    </Center>
  )
}