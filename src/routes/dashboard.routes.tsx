import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'
import { CreateAnnounce } from '../screens/CreateAnnounce';

import { Dashboard } from '../screens/Dashboard';

type DashBoardRoutes = {
 dashboard: undefined;
 createAnnounce: undefined;
 editAnnounce: undefined;
 announcePreview: undefined;
 productDetails: undefined;
}

export type DashboardNavigationRouteProps = StackNavigationProp<DashBoardRoutes>

const {Screen, Navigator} = createStackNavigator<DashBoardRoutes>()

export function DashBoardRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='dashboard' component={Dashboard}/>
      <Screen name='createAnnounce' component={CreateAnnounce} />
    </Navigator>
  )
}