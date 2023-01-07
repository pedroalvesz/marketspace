import { Divider, Icon, IconButton, Input } from "native-base";
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 


export function SearchBar() {
  return(
    <Input
    placeholder='Product Name'
    bg='gray.7'
    size='xl'
    borderWidth={0}
    py={3}
    px={4}
    mb={4}
    rightElement={<Filters/>}
    _focus={{
      borderWidth: 1,
      borderColor: 'gray.3'
    }}
    />
  )
}



function Filters() {
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
    />
    </>
  )
}