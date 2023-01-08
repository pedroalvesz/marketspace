import {useState} from 'react'
import {
  Center,
  Heading,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import * as ImagePicker from 'expo-image-picker'

import { Feather } from '@expo/vector-icons';

import { CustomButton } from '../components/CustomButton'
import { FormImage } from '../components/FormImage'
import { FormInput } from '../components/Input'

import { AuthNavigationRouteProps } from '../routes/auth.routes'
import SmallLogoSvg from '../assets/logo_small.svg'



type SignUpProps = {
  name: string,
  email: string,
  tel: string,
  password: string,
  password_confirm: string;
}


const SignUpSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().required('Email is required.').email('Please insert a valid email'),
  tel: yup.string().required('Phone number is required.'),
  password: yup.string().required('Password is required.').min(6, 'Your password must have at least 6 characters.'),
  password_confirm: yup.string().required('Please confirm your password.').oneOf([yup.ref('password'), 'Passwords do not match.'], null)
})

import DefaultUserPhoto from '../assets/DefaultUserPhoto.png'

export function SignUp() {

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isConfirmHidden, setIsConfirmHidden] = useState(true)
  const [userPhoto, setUserPhoto] = useState('')

  const navigation = useNavigation<AuthNavigationRouteProps>()

  const {control, handleSubmit, formState: {errors}} = useForm<SignUpProps>({
    resolver: yupResolver(SignUpSchema)
  })

  function handleGoBack() {
    navigation.goBack()
  }

  function handleSignUp(data : SignUpProps) {
    console.log(data)
  }

  async function handleSetUserPhoto() {
    const PhotoSelected = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      aspect: [1,1],
      allowsEditing: true,
    })

    if(PhotoSelected.canceled) {
      return;
    }

    if(PhotoSelected.assets[0].uri) {
      setUserPhoto(PhotoSelected.assets[0].uri)
      console.log(userPhoto)
    }
  }


  return (
    <KeyboardAvoidingView behavior="padding" bg="gray.6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <VStack flex={1} pt={16} px={12} alignItems="center">
          <SmallLogoSvg />

          <Heading
            fontFamily="heading"
            fontSize="xl"
            color="gray.1"
            pt={3}
            pb={2}
          >
            Welcome!
          </Heading>

          <Text
            textAlign="center"
            fontFamily="body"
            fontSize="sm"
            color="gray.2"
            mb={4}
          >
            Create an account to use your marketspace to buy and sell products.
          </Text>

          <FormImage
          source={userPhoto ? {uri : userPhoto} : DefaultUserPhoto}
          onPress={handleSetUserPhoto}
          />

          <Center mt={4} mb={6}>
            <Controller
            control={control}
            name='name'
            render={({field : {onChange}}) => (
              <FormInput
              placeholder="Name"
              onChangeText={onChange}
              errorMessage={errors.name?.message}
              />
            )
            }
            />

            <Controller
            control={control}
            name='email'
            render={({field : {onChange}}) =>
              <FormInput
              placeholder="Email"
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              />
            }
            />
            
            <Controller
            control={control}
            name='tel'
            render={({field : {onChange}}) =>
              <FormInput
              placeholder="Phone number"
              onChangeText={onChange}
              errorMessage={errors.tel?.message}
              />
            }
            />

            <Controller
            control={control}
            name='password'
            render={({field : {onChange}}) =>
              <FormInput
              placeholder="Password"
              onChangeText={onChange}
              errorMessage={errors.password?.message}
              secureTextEntry={isPasswordHidden ? true : false}
              rightElement={
                isPasswordHidden
                ?
                <IconButton
                icon={<Icon
                as={Feather}
                name='eye'
                color='gray.2'
                onPress={() => setIsPasswordHidden(prevValue => !prevValue)}
                />}
                />
                :
                <IconButton
                icon={<Icon
                as={Feather}
                name='eye-off'
                color='gray.2'
                onPress={() => setIsPasswordHidden(prevValue => !prevValue)}
                />}
                />
                }
              />
            }
            />

            <Controller
            control={control}
            name='password_confirm'
            render={({field : {onChange}}) =>
              <FormInput
              placeholder="Confirm Password"
              onChangeText={onChange}
              errorMessage={errors.password_confirm?.message}
              secureTextEntry={isConfirmHidden ? true : false}
              rightElement={
                isConfirmHidden
                ?
                <IconButton
                icon={<Icon
                as={Feather}
                name='eye'
                color='gray.2'
                onPress={() => setIsConfirmHidden(prevValue => !prevValue)}
                />}
                />
                :
                <IconButton
                icon={<Icon
                as={Feather}
                name='eye-off'
                color='gray.2'
                onPress={() => setIsConfirmHidden(prevValue => !prevValue)}
                />}
                />
                }
              />
            }
            />       
          </Center>

          <CustomButton
          name="Register"
          onPress={handleSubmit(handleSignUp)}
          bg="gray.1"
          textColor="gray.7"
          isBig
          />

          <Center width="100%" my={12}>
            <Text
              textAlign="center"
              fontFamily="body"
              fontSize="sm"
              color="gray.2"
              mb={4}
            >
              Already registered?
            </Text>

            <CustomButton
              name="Back to Login"
              bg="gray.5"
              textColor="gray.2"
              onPress={handleGoBack}
              isBig
            />
          </Center>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
