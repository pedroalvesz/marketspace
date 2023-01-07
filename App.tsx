import {LogBox} from 'react-native'
import { NativeBaseProvider, StatusBar } from 'native-base'

import { theme } from './styles/theme'
import { Loading } from './src/components/Loading'


import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'
import { Routes } from './src/routes'
import { Dashboard } from './src/screens/Dashboard'
import { CreateAnnounce } from './src/screens/CreateAnnounce'


export default function App() {
  LogBox.ignoreLogs([
    "We can not support a function callback. See Github Issues for details https://github.com/adobe/react-spectrum/issues/2320",
    ]);
    
  const [fontsLoading] = useFonts({Karla_400Regular, Karla_700Bold})

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle='dark-content' translucent/>
      { !fontsLoading ? <Loading/> : <CreateAnnounce/> }
    </NativeBaseProvider>
  )
}
