import {createStackNavigator, StackNavigationProp} from '@react-navigation/stack'


import { HomeTabs } from './hometab.routes';

import { CreateAnnounce } from '../screens/CreateAnnounce';
import { PreviewAnnounce } from '../screens/PreviewAnnounce';
import { EditAnnounce } from '../screens/EditAnnounce';
import { AnnounceDetails } from '../screens/AnnounceDetails';

import { CreateAnnounceDTO } from '../dtos/CreateAnnounceDTO';
import { ProductDetailsDTO } from '../dtos/ProductDetails';

type AppRoutes = {
  hometabs: undefined;
  sellerAnnoune: {id: string};
  createAnnounce: undefined;
  announceDetails: {id: string};
  previewAnnounce: CreateAnnounceDTO;
  editAnnounce: ProductDetailsDTO;
}

export type AppNavigationRouteProps = StackNavigationProp<AppRoutes>

const {Navigator, Screen} = createStackNavigator<AppRoutes>()

export function AppRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name='hometabs' component={HomeTabs}/>
      <Screen name='createAnnounce' component={CreateAnnounce}/>
      <Screen name='previewAnnounce' component={PreviewAnnounce} />
      <Screen name='announceDetails' component={AnnounceDetails}/>
      <Screen name='editAnnounce' component={EditAnnounce}/>
    </Navigator>
  )
}