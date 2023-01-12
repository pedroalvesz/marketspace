import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'


import { HomeTabs } from './hometab.routes';

import { CreateAnnounce } from '../screens/CreateAnnounce';
import { UserAnnounceDetails } from '../screens/UserAnnounceDetails';
import { PreviewAnnounce } from '../screens/PreviewAnnounce';
import { SellerAnnounce } from '../screens/SellerAnnounce';
import { EditAnnounce } from '../screens/EditAnnounce';

import { CreateAnnounceDTO } from '../dtos/CreateAnnounceDTO';
import { UserAnnounceDTO } from '../dtos/UserAnnounceDTO';

type AppRoutes = {
  hometabs: undefined;
  sellerAnnoune: {id: string};
  createAnnounce: undefined;
  userAnnounceDetails: UserAnnounceDTO;
  previewAnnounce: CreateAnnounceDTO;
  editAnnounce: UserAnnounceDTO;
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
      <Screen name='editAnnounce' component={EditAnnounce}/>
    </Navigator>
  )
}