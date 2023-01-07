import { Switch } from "react-native";
import { Heading, HStack, VStack, IconButton, Icon, Text, Center, ScrollView, Radio, useTheme, Checkbox} from "native-base";
import {Feather, FontAwesome5} from '@expo/vector-icons'
import {FormInput} from '../components/Input'
import { FormTextArea } from "../components/FormTextArea";
import { useState } from "react";
import { CustomButton } from "../components/CustomButton";


export function CreateAnnounce() {

  const [isTradable, setIsTradable] = useState(true)
  const [productUsage, setProductUsage] = useState('new')
  const [paymentMethods, setPaymentMethods] = useState([])
  const { colors } = useTheme()

  function handleTradable() {
    setIsTradable(previusState => !previusState)
  }
  return(
    <>
    <VStack flex={1} bg='gray.6' pt={16} px={6}>
      <HStack width='full' alignItems='center' justifyContent='space-between' mb={6}>
        <IconButton
        icon={<Icon
          as={Feather}
          name='arrow-left'
          size={7}
          color='gray.1'
          />}
        />
        <Heading fontFamily='heading' fontSize='xl' color='gray.1' flex={1} textAlign="center" ml={-12}>
          Create Announce
        </Heading>
      </HStack>

      <ScrollView showsVerticalScrollIndicator={false}>
      <VStack flex={1} bg='gray.6' pb={32}>
        <Text fontFamily='heading' fontSize='md' color='gray.2' mb={1}>
          Images
        </Text>

        <Text fontFamily='body' fontSize='sm' color='gray.3' mb={4}>
          You may choose until 3 images to show how incredible your product is!
        </Text>
        

        <HStack mb={8}>
          <Center h='100px' w='100px' bg='gray.5' rounded='md'>
            <Icon as={FontAwesome5} name='plus'/>
          </Center>
        </HStack>


        <Text fontFamily='heading' fontSize='md' color='gray.2' mb={1}>
          Product Info
        </Text>
        
        <FormInput
        placeholder='Product Title'
        />

        <FormTextArea
        placeholder='Product Description'
        />
        
        <Radio.Group
        name='Product usage'
        value={productUsage}
        onChange={nextValue => setProductUsage(nextValue)}
        >
        <HStack space={5}>
          <Radio value='new'>
            New product
          </Radio>
          <Radio value='used'>
            Used product
          </Radio>
        </HStack>
        </Radio.Group>

        <Text fontFamily='heading' fontSize='md' color='gray.2' mt={8} mb={4}>
          Price
        </Text>

        <FormInput
        placeholder='Product price'
        leftElement={<Icon as={FontAwesome5} name='dollar-sign' color='gray.1' size={5} ml={4}/>}
        />

        <Text fontFamily='heading' fontSize='sm' color='gray.2' mb={3}>
          Tradable?
        </Text>
        
        <Switch
        value={isTradable}
        onValueChange={handleTradable}
        trackColor={{ false: "#767577", true: colors.primary[600] }}
        />

        <Text fontFamily='heading' fontSize='sm' color='gray.2' mt={4} mb={1}>
          Payment methods
        </Text>

        <Checkbox.Group onChange={setPaymentMethods} value={paymentMethods} accessibilityLabel="choose numbers">
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
      </ScrollView>
    </VStack>

    <HStack bg='white' w='100%' position='absolute' bottom={0} h={20} justifyContent='space-between' px={6} py={4}>
      <CustomButton
      name='Cancel'
      bg='gray.5'
      textColor='gray.2'
      />
      <CustomButton
      name='Submit'
      bg='gray.1'
      textColor='gray.7'
      />
    </HStack>
    
    </>
  )
}