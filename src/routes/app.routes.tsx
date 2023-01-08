import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { DashBoardRoutes } from './dashboard.routes';
import { UserAnnounces } from '../screens/UserAnnounces';

import { Octicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useTheme } from 'native-base';



type AppRoutes = {
  dashboardRoutes: undefined;
  userAnnounces: undefined;
}

export type AppNavigationRouteProps = BottomTabNavigationProp<AppRoutes>

const {Navigator, Screen} = createBottomTabNavigator<AppRoutes>()


export function AppRoutes() {
  const {sizes, colors} = useTheme()

  const ICON_SIZE = sizes[6]

  return(
    <Navigator 
    screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[2],
      tabBarInactiveTintColor: colors.gray[4],
      tabBarStyle: {
        paddingTop: sizes[5],
        borderTopWidth: 0,
      }
      }}>
      <Screen name='dashboardRoutes' component={DashBoardRoutes} options={{tabBarIcon: ({color}) => <Octicons name="home" size={ICON_SIZE} color={color} />  }}/>
      <Screen name='userAnnounces' component={UserAnnounces} options={{tabBarIcon: ({color}) => <Feather name="tag" size={ICON_SIZE} color={color} /> }}/>
    </Navigator>
  )
}