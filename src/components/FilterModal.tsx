import { useState } from 'react'
import { Checkbox, Heading, HStack, Icon, IconButton, Text, useTheme, VStack, Switch } from "native-base";
import { AntDesign } from '@expo/vector-icons';
import { Tag } from './Tag';

export function FilterModal() {

  const { colors } = useTheme()

  const [isTradable, setIsTradable] = useState(false)
  const [productUsage, setProductUsage] = useState('new')


  return(
    <VStack flex={1} px={6} pt={2} pb={8}>
      <HStack justifyContent='space-between' alignItems='center' mb={6}>
        <Heading fontFamily='heading' fontSize='xl' color='gray.1'>
          Create Announce
        </Heading>

        <IconButton
        icon={<Icon
          as={AntDesign}
          name='close'
          size={6}
          color='gray.4'
        />}
        />
      </HStack>

      <Text fontFamily='heading' fontSize='sm' color='gray.2' mb={3}>
        Product Info
      </Text>
      
      <HStack space={2} mb={6}>
        <Tag
        name='new'
        isActive={productUsage === 'new'}
        onPress={() => setProductUsage('new')}
        />
        <Tag
        name='used'
        isActive={productUsage === 'used'}
        onPress={() => setProductUsage('used')}
        />
      </HStack>

      <Text fontFamily='heading' fontSize='sm' color='gray.2' mb={3}>
          Tradable?
        </Text>
        
        <Switch
        isChecked={isTradable}
        onToggle={() => setIsTradable(prevValue => !prevValue)}
        mb={6}
        
        />
      
      <Checkbox.Group accessibilityLabel="choose numbers">
          <Checkbox value='boleto' mb={1}>
            Bank Billing
          </Checkbox>
          <Checkbox value='pix' mb={1}>
            Pix
          </Checkbox>
          <Checkbox value='cash' mb={1}>
            Cash
          </Checkbox>
          <Checkbox value='card' mb={1}>
            Credit Card
          </Checkbox>
          <Checkbox value='deposit' mb={1}>
            Deposit
          </Checkbox>
        </Checkbox.Group>

    </VStack>
)
}