import {Platform} from 'react-native'
import {Center, KeyboardAvoidingView, ScrollView, Text, VStack} from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { CustomButton } from '../components/CustomButton'

import LogoSvg from '../assets/logo.svg'
import SubTitleSvg from '../assets/subtitle.svg'
import { FormInput } from '../components/Input'
import { StackNavigationRouteProps } from '../routes/stack'

export function SignIn() {

  const navigation = useNavigation<StackNavigationRouteProps>()

  function handleNavigateRegister() {
    navigation.navigate('signUp')
  }
  return(
    <KeyboardAvoidingView behavior='height'>
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <VStack bg='gray.6' pt={32} pb={16} px={12} alignItems='center' rounded='3xl'>

        <VStack width='100%' alignItems='center' space={5}>
        <LogoSvg/>
        <SubTitleSvg/>
        </VStack>

        <Text fontFamily='body' fontSize='sm' color='gray.3'>
          Your buying and selling space
        </Text>

        <Center pt={16}>
          <Text fontFamily='body' fontSize='sm' color='gray.2' mb={4}>
            Enter your account
          </Text>
          <FormInput
          placeholder='E-mail'
          />
          <FormInput
          placeholder='Password'
          />
        </Center>
        <CustomButton name='Enter'/>
      </VStack>

      <Center pt={12} px={12} pb={6} color='white'>
        <Text fontFamily='body' fontSize='sm' color='gray.2' mb={4}>
          Not registered yet?
        </Text>

        <CustomButton
        name='Register'
        bg='gray.5'
        textColor='gray.2'
        onPress={handleNavigateRegister}
        />
      </Center>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}