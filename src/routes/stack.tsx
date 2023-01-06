import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import { SignIn } from '../screens/SignIn'
import { SignUp } from '../screens/SignUp'


type StackRoutesProps = {
  signIn: undefined,
  signUp: undefined,
}

export type StackNavigationRouteProps = StackNavigationProp<StackRoutesProps>

const {Navigator, Screen} = createStackNavigator<StackRoutesProps>()

export function StackRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}>
    <Screen name='signIn' component={SignIn}/>
    <Screen name='signUp' component={SignUp}/>
   </Navigator>
  )
}