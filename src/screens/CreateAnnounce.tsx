import { useState } from "react";
import {TouchableOpacity } from "react-native";
import {Switch, Heading, HStack, VStack, IconButton, Icon, Text, Center, ScrollView, Radio, useTheme, Checkbox, useToast, Button} from "native-base";
import {useNavigation} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import {Feather, FontAwesome5} from '@expo/vector-icons'

import { FormTextArea } from "../components/FormTextArea";
import { DemoImage } from "../components/DemoImage";
import {FormInput} from '../components/Input'

import { AppNavigationRouteProps } from "../routes/app.routes";



export function CreateAnnounce() {

  const [images, setImages] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isNew, setIsNew] = useState(true)
  const [price, setPrice] = useState('')
  const [isTradable, setIsTradable] = useState(true)
  const [paymentMethods, setPaymentMethods] = useState<string[]>([])


  const navigation = useNavigation<AppNavigationRouteProps>()
  const toast = useToast()


  function handleGoBack() {
    navigation.goBack()
  }

  async function handleAddImage() {

    if(images.length >= 3) {
      return toast.show({
        title: 'Your product can only have 3 images.',
        bg: 'yellow.500',
        placement: 'top',
        mx: 4
      })
    }

    const ImageSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4,3],
      allowsEditing: true,
      quality: 1,
    })

    if(ImageSelected.canceled) {
      return;
    }

    if(ImageSelected.assets[0].uri){
      console.log(ImageSelected.assets[0].uri)
      setImages(prevValues => [...prevValues, ImageSelected.assets[0].uri])
    }
  }

  function handlePreview() {

    if(images.length === 0 || paymentMethods.length === 0 || title.trim() === '' || description.trim() === '' || price.trim() === '') {
      return toast.show({
        title: 'Please fill out all fields.',
        bg: 'yellow.500',
        placement: 'top',
        mx: 4,
      })
    }

    const data = {
      images,
      name : title,
      description : description,
      is_new: isNew,
      price : Number(price),
      accept_trade : isTradable,
      payment_methods : paymentMethods,
    }

    navigation.navigate('previewAnnounce', data)
  }


  return(
    <>
    <VStack flex={1} bg='gray.6' pt={16} px={6}>
      <HStack width='full' alignItems='center' justifyContent='space-between' mb={6}>
        <IconButton
        onPress={handleGoBack}
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
        

        <ScrollView mb={8} horizontal showsHorizontalScrollIndicator={false}>
          {images.map(image => <DemoImage source={{uri: image}} key={image} />)}
          <TouchableOpacity onPress={handleAddImage}>
            <Center h='100px' w='100px' bg='gray.5' rounded='md'>
              <Icon as={FontAwesome5} name='plus'/>
            </Center>
          </TouchableOpacity>
        </ScrollView>


        <Text fontFamily='heading' fontSize='md' color='gray.2' mb={1}>
          Product Info
        </Text>
        
        <FormInput
        placeholder='Product Title'
        onChangeText={setTitle}
        />

        <FormTextArea
        placeholder='Product Description'
        onChangeText={setDescription}
        />
        
        <Radio.Group
        name='Product usage'
        value={isNew ? 'new' : 'used'}
        onChange={() => setIsNew(prevValue => !prevValue)}
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
        keyboardType='numeric'
        leftElement={<Icon as={FontAwesome5} name='dollar-sign' color='gray.1' size={5} ml={4}/>}
        onChangeText={setPrice}
        />

        <Text fontFamily='heading' fontSize='sm' color='gray.2' mb={3}>
          Tradable?
        </Text>
        
        <Switch
        isChecked={isTradable}
        onToggle={() => setIsTradable(prevValue => !prevValue)}
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

    <HStack bg='white' w='100%' position='absolute' bottom={0} h='90px' justifyContent='space-between' px={6} py={4} pb={6}>
      <Button
      variant='gray'
      w='48%'
      onPress={handleGoBack}
      >
       Cancel
      </Button>
      <Button
      variant='black'
      w='48%'
      onPress={handlePreview}
      >
        Preview
      </Button>
    </HStack>
    </>
  )
}