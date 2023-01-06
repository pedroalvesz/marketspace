import { Button, Text, IButtonProps } from "native-base";


type ButtonProps = IButtonProps & {
  name: string;
  textColor?: string;
}
export function CustomButton({name, textColor = 'white', ...rest} : ButtonProps) {
  return(
    <Button
    width='100%'
    bg='blue_secondary'
    py={3}
    rounded='md'

    {...rest}
    >
      <Text fontFamily='heading' fontSize='sm' color={textColor}>{name}</Text>
    </Button>
  )
}