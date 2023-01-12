import { useState } from "react";
import { Switch, TouchableOpacity } from "react-native";
import { Heading, HStack, VStack, IconButton, Icon, Text, Center, ScrollView, Radio, useTheme, Checkbox, Image, useToast} from "native-base";
import {useNavigation, useRoute} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import {Feather, FontAwesome5} from '@expo/vector-icons'


import { FormTextArea } from "../components/FormTextArea";
import { CustomButton } from "../components/CustomButton";
import { DemoImage } from "../components/DemoImage";
import {FormInput} from '../components/Input'

import { AppNavigationRouteProps } from "../routes/app.routes";
import { UserAnnounceDTO } from "../dtos/UserAnnounceDTO";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";


//PRECISO PEGAR O ANOUNCIO PELO ID, FAZER A REQUISIÇÃO E COMPARAR SE O ARRAY DE IMAGENS MUDOU, SE MUDOU ENTÃO EU FAÇO O MÉTODO DE ENVIAR PRA API
//OU
//SEMPRE APAGAR E ENVIAR AS IMAGENS INDEPENDENTE SE MUDOU OU NÃO, NÃO FICA LEGAL PARA API MAS NO APP FICA MAIS PERFORMATICO PQ NÃO DEMORA PARA MOSTRAR AS INFORMAÇÕES


export function EditAnnounce() {

  const navigation = useNavigation<AppNavigationRouteProps>()
  const route = useRoute()
  const product = route.params as UserAnnounceDTO

  const paymentMethodsName = []

  product.payment_methods.forEach((method) => (
    paymentMethodsName.push(method.key)
  ))

  const [oldImages, setOldImages] = useState<productImages[]>(product.product_images)
  const [imagesDeleted, setImagesDeleted] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])

  const [title, setTitle] = useState(product.name)
  const [description, setDescription] = useState(product.description)
  const [isNew, setIsNew] = useState(product.is_new)
  const [price, setPrice] = useState(product.price.toString())
  const [isTradable, setIsTradable] = useState(product.accept_trade)
  const [paymentMethods, setPaymentMethods] = useState(paymentMethodsName)
  
  const {ErrorToast} = useAuth()
  const { colors } = useTheme()
  const toast = useToast()


  function handleGoBack() {
    navigation.goBack()
  }

  async function handleEditAnnounce() {
    try {
      if(images.length + oldImages.length === 0 || paymentMethods.length === 0 || title.trim() === '' || description.trim() === '' || price.trim() === '') {
        return toast.show({
          title: 'Please fill out all fields.',
          bg: 'yellow.400',
          placement: 'top',
          mx: 4,
        })
      }

      const data = {
        name: title,
        description,
        is_new: isNew,
        accept_trade: isTradable,
        payment_methods: paymentMethods,
        price: Number(price),
      }
      
      await api.put(`/products/${product.id}`, data)
      

    } catch (error) {
      ErrorToast(error)
    }
  }

  function handleRemoveImage(item) {
    if(item.id) {
      setOldImages(oldImages.filter(image => image.id !== item.id))
      setImagesDeleted(prevValues => [...prevValues, item.id])
    }

    setImages(images.filter(image => image !== item))
  }

  async function handleAddImage() {

    if(oldImages.length + images.length >= 3) {
      return console.log('já tem 3 imagens')
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
      setImages(prevValues => [...prevValues, ImageSelected.assets[0].uri])
    }
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
          Edit Announce
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
          {oldImages.map(image => 
            <DemoImage
            source={{uri: `${api.defaults.baseURL}/images/${image.path}`}}
            key={image.id}
            onPress={() => handleRemoveImage(image)}
            />
          )}

          {images.map(image => 
            <DemoImage
            source={{uri: image}}
            key={image}
            onPress={() => handleRemoveImage(image)}
            />
          )}

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
        value={title}
        onChangeText={setTitle}
        />

        <FormTextArea
        placeholder='Product Description'
        value={description}
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
        value={price}
        onChangeText={setPrice}
        />

        <Text fontFamily='heading' fontSize='sm' color='gray.2' mb={3}>
          Tradable?
        </Text>
        
        <Switch
        value={isTradable}
        onValueChange={() => setIsTradable(prevValue => !prevValue)}
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

    <HStack bg='white' w='100%' position='absolute' bottom={0} h='90px' justifyContent='space-between' px={6} py={4} pb={6}>
      <CustomButton
      name='Cancel'
      bg='gray.5'
      textColor='gray.2'
      onPress={handleGoBack}
      />
      <CustomButton
      name='Edit'
      bg='gray.1'
      textColor='gray.7'
      onPress={handleEditAnnounce}
      />
    </HStack>
    
    </>
  )
}