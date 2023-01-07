import {
  Center,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  VStack
} from 'native-base'
import { useNavigation } from '@react-navigation/native'

import SmallLogoSvg from '../assets/logo_small.svg'

import { CustomButton } from '../components/CustomButton'
import { FormImage } from '../components/FormImage'
import { FormInput } from '../components/Input'

import { AuthNavigationRouteProps } from '../routes/AuthRoutes'

export function SignUp() {
  const navigation = useNavigation<AuthNavigationRouteProps>()

  function handleGoBack() {
    navigation.goBack()
  }

  return (
    <KeyboardAvoidingView behavior="padding" bg="gray.6">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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

          <FormImage />
          <Center mt={4} mb={6}>
            <FormInput placeholder="Name" />
            <FormInput placeholder="Email" />
            <FormInput placeholder="Phone number" />
            <FormInput placeholder="Password" />
            <FormInput placeholder="Confirm password" />
          </Center>

          <CustomButton name="Register" bg="gray.1" textColor="gray.7" />

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
            />
          </Center>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
