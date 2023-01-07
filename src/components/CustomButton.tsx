import { Button, Text, IButtonProps } from "native-base";


type ButtonProps = IButtonProps & {
  name: string;
  textColor?: string;
  isBig?: boolean;
}
export function CustomButton({name, textColor = 'white', isBig = false, ...rest} : ButtonProps) {
  return(
    <Button
    w={isBig ? 279 : 140}
    bg='blue_secondary'
    //h='42px'
    py={3}
    rounded='md'

    {...rest}
    >
      <Text fontFamily='heading' fontSize='sm' color={textColor}>{name}</Text>
    </Button>
  )
}