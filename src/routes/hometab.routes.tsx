import {BottomTabNavigationProp, createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { useTheme } from 'native-base';
import {Octicons, Feather} from '@expo/vector-icons'

import { Dashboard } from '../screens/Dashboard';
import { UserAnnounces } from '../screens/UserAnnounces';

type HomeTabRoutes = {
  home: undefined,
  userAnnounces: undefined;
}

export type HomeTabNavigationRouteProps = BottomTabNavigationProp<HomeTabRoutes>

const {Screen, Navigator} = createBottomTabNavigator<HomeTabRoutes>()


export function HomeTabs() {

  const {colors, sizes} = useTheme()
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
        }}
      >
        <Screen name='home' component={Dashboard} options={{tabBarIcon: ({color}) => <Octicons name="home" size={ICON_SIZE} color={color} />  }}/>
        <Screen name='userAnnounces' component={UserAnnounces} options={{tabBarIcon: ({color}) => <Feather name="tag" size={ICON_SIZE} color={color} /> }}/>
      </Navigator>
  )
}