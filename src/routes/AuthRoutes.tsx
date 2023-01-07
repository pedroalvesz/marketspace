import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'


type AuthRoutesProps = {
  signIn: undefined,
  signUp: undefined,
}

export type AuthNavigationRouteProps = StackNavigationProp<AuthRoutesProps>

const {Navigator, Screen} = createStackNavigator<AuthRoutesProps>()

export function AuthRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}>
    <Screen name='signIn' component={SignIn}/>
    <Screen name='signUp' component={SignUp}/>
   </Navigator>
  )
}