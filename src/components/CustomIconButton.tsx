import { Button, IButtonProps, Text } from "native-base";

type ButtonProps = IButtonProps & {
  name: string;
  textColor?: string;
}

export function CustomIconButton({name, textColor = 'white', ...rest} : ButtonProps) {
  return(
    <Button
    p={3}
    bg='blue_secondary'
    rounded='md'

    {...rest}
    >
      <Text fontFamily='heading' fontSize='sm' color={textColor}>{name}</Text>
    </Button>
  )
}