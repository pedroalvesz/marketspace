import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'


import { HomeTabs } from './hometab.routes';

import { CreateAnnounce } from '../screens/CreateAnnounce';
import { UserAnnounceDetails } from '../screens/UserAnnounceDetails';
import { PreviewAnnounce } from '../screens/PreviewAnnounce';
import { SellerAnnounce } from '../screens/SellerAnnounce';

import { CreateAnnounceDTO } from '../dtos/CreateAnnounceDTO';
import { UserAnnounceDTO } from '../dtos/UserAnnounceDTO';
import { onSaleProductDTO } from '../dtos/onSaleProductDTO';

type AppRoutes = {
  hometabs: undefined;
  sellerAnnoune: {id: string};
  createAnnounce: undefined;
  userAnnounceDetails: UserAnnounceDTO;
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
      <Screen name='userAnnounceDetails' component={UserAnnounceDetails}/>
    </Navigator>
  )
}