import { Icon, IInputProps, Input } from 'native-base'


type InputProps = IInputProps & {

}


export function FormInput({...rest} : InputProps) {
  return(
    <Input
    bg='gray.7'
    size='lg'
    borderWidth={0}
    py={3}
    px={4}
    mb={4}
    _focus={{
      borderWidth: 1,
      borderColor: 'gray.3'
    }}
    {...rest}
    />
  )
}