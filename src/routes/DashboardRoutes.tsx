import {createStackNavigator} from '@react-navigation/stack'

type DashBoardRoutes = {
 dashboard: undefined;
 createAnnounce: undefined;
 editAnnounce: undefined;
 announcePreview: undefined;
 productDetails: undefined;
}

const {Screen, Navigator} = createStackNavigator<DashBoardRoutes>()

export function DashBoardRoutes() {
  return(
    <Navigator>
      
    </Navigator>
  )
}