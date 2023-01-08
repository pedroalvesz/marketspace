import {useState} from 'react'
import {
  Center,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack
} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { CustomButton } from '../components/CustomButton'

import {Feather} from '@expo/vector-icons'
import {useForm, Controller} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'

import LogoSvg from '../assets/logo.svg'
import SubTitleSvg from '../assets/subtitle.svg'
import { FormInput } from '../components/Input'
import { AuthNavigationRouteProps } from '../routes/auth.routes'


type SignInProps = {
  email: string,
  password: string,
}

const SignInSchema = yup.object({
  email: yup.string().required('Email is required.').email('Please insert a valid email'),
  password: yup.string().required('Password is required.')
})


export function SignIn() {

  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  const navigation = useNavigation<AuthNavigationRouteProps>()
  const {control, handleSubmit, formState: {errors}} = useForm<SignInProps>({
    resolver: yupResolver(SignInSchema)
  })

  function handleNavigateRegister() {
    navigation.navigate('signUp')
  }

  function handleSignIn(data: SignInProps) {
    console.log(data)
  }

  return (
    <KeyboardAvoidingView behavior="height">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack
          bg="gray.6"
          pt={32}
          pb={16}
          px={12}
          alignItems="center"
          rounded="3xl"
        >
          <VStack width="100%" alignItems="center" space={5}>
            <LogoSvg />
            <SubTitleSvg />
          </VStack>
          <Text fontFamily="body" fontSize="sm" color="gray.3">
            Your buying and selling space
          </Text>


          <Center pt={16}>

            <Text fontFamily="body" fontSize="sm" color="gray.2" mb={4}>
              Enter your account
            </Text>

            <Controller
            control={control}
            name='email'
            render={({field : {onChange}}) => (
              <FormInput
              placeholder="E-mail"
              onChangeText={onChange}
              errorMessage={errors.email?.message}
              />
            )}
            />

            <Controller
            control={control}
            name='password'
            render={({field : {onChange}}) => (
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
            )}
            />
          </Center>


          <CustomButton
          name="Enter"
          onPress={handleSubmit(handleSignIn)}
          isBig
          />
        </VStack>

        <Center pt={12} px={12} pb={6} color="white">
          <Text fontFamily="body" fontSize="sm" color="gray.2" mb={4}>
            Not registered yet?
          </Text>

          <CustomButton
            name="Register"
            bg="gray.5"
            textColor="gray.2"
            onPress={handleNavigateRegister}
            isBig
          />
        </Center>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
