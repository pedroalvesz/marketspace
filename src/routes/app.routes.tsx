import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'


import { HomeTabs } from './hometab.routes';
import { CreateAnnounce } from '../screens/CreateAnnounce';
import { MyAnnounceDetails } from '../screens/MyAnnounceDetails';
import { PreviewAnnounce } from '../screens/PreviewAnnounce';
import { SellerAnnounce } from '../screens/SellerAnnounce';
import { CreateAnnounceDTO } from '../dtos/CreateAnnounceDTO';

type AppRoutes = {
  hometabs: undefined;
  sellerAnnoune: undefined;
  createAnnounce: undefined;
  myAnnounceDetails: undefined;
  editAnnounce: undefined;
  previewAnnounce: CreateAnnounceDTO
}

export type AppNavigationRouteProps = StackNavigationProp<AppRoutes>

const {Navigator, Screen} = createStackNavigator<AppRoutes>()

export function AppRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='hometabs' component={HomeTabs}/>
      <Screen name='sellerAnnoune' component={SellerAnnounce}/>
      <Screen name='createAnnounce' component={CreateAnnounce}/>
      <Screen name='previewAnnounce' component={PreviewAnnounce} />
      <Screen name='myAnnounceDetails' component={MyAnnounceDetails}/>
    </Navigator>
  )
}