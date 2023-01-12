import { Divider, Icon, IconButton, IIconButtonProps} from "native-base";
import {Entypo, Feather} from '@expo/vector-icons'


type Props = IIconButtonProps & {
  filter: () => Promise<void>;
  handleOpenModal: () => void;
}

export function Filters({filter, handleOpenModal,...rest} : Props) {
  return(
    <>
    <IconButton
    onPress={filter}
    icon={<Icon
      as={Entypo}
      name='magnifying-glass'
      color='gray.1'
    />}
    />
    <Divider orientation="vertical" height='50%'/>
    <IconButton
    onPress={handleOpenModal}
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