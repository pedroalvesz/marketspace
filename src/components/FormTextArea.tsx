import { TextArea, ITextAreaProps } from "native-base";


export function FormTextArea({...rest} : ITextAreaProps ) {
  return(
    <TextArea
    numberOfLines={5}
    autoCompleteType
    h={40}
    bg='gray.7'
    size='lg'
    borderWidth={0}
    py={3}
    px={4}
    mb={4}
    _focus={{
      bg: "gray.7",
      borderWidth: 1,
      borderColor: 'gray.3'
    }}

    {...rest}
    />
  )
}