import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import { CreateAnnounce } from '../screens/CreateAnnounce';
import { EditAnnounce } from '../screens/EditAnnounce';
import { HomeTabs } from './hometab.routes';

type AppRoutes = {
  hometabs: undefined;
  createAnnounce: undefined;
  editAnnounce: undefined;
  previewAnnounce: undefined;
}

export type AppNavigationRouteProps = StackNavigationProp<AppRoutes>

const {Navigator, Screen} = createStackNavigator<AppRoutes>()

export function AppRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='hometabs' component={HomeTabs}/>
      <Screen name='createAnnounce' component={CreateAnnounce}/>
      <Screen name='editAnnounce' component={EditAnnounce}/>
    </Navigator>
  )
}