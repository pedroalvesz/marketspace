import {IInputProps, Input, FormControl, IconButton, Icon } from 'native-base'


type InputProps = IInputProps & {
  errorMessage?: string | null;
}


export function FormInput({errorMessage, ...rest} : InputProps) {
  return(
    <FormControl isInvalid={!!errorMessage} mb={4}>
      <Input
      bg='gray.7'
      size='lg'
      borderWidth={0}
      w='100%'
      py={3}
      px={4}
      _focus={{
        bg: "gray.7",
        borderWidth: 1,
        borderColor: 'gray.3'
      }}

      {...rest}
      />

      <FormControl.ErrorMessage _text={{ color: 'red.500'}}>
        {errorMessage}
      </FormControl.ErrorMessage>
    </FormControl>
  )
}