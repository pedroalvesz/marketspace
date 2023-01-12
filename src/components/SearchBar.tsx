import {IInputProps, Input} from "native-base";



export function SearchBar({...rest} : IInputProps ) {
  return(
    <Input
    placeholder='Product Name'
    bg='gray.7'
    size='xl'
    borderWidth={0}
    py={3}
    px={4}
    mb={4}
    _focus={{
      bg: 'gray.7',
      borderWidth: 1,
      borderColor: 'gray.3'
    }}

    {...rest}
    />
  )
}



