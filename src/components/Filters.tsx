import { Divider, Icon, IconButton, IIconButtonProps} from "native-base";
import {Entypo, Feather} from '@expo/vector-icons'


export function Filters({...rest} : IIconButtonProps) {
  return(
    <>
    <IconButton
    icon={<Icon
      as={Entypo}
      name='magnifying-glass'
      color='gray.1'
    />}
    />
    <Divider orientation="vertical" height='50%'/>
    <IconButton
    icon={<Icon
      as={Feather}
      name='sliders'
      color='gray.1'
    />}
    
    {...rest}
    />
    </>
  )
}