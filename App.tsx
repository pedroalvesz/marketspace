import { NativeBaseProvider, StatusBar } from 'native-base'

import { theme } from './styles/theme'
import { Loading } from './src/components/Loading'

import {
  useFonts,
  Karla_400Regular,
  Karla_700Bold,
} from '@expo-google-fonts/karla'
import { Routes } from './src/routes'

export default function App() {

  const [fontsLoading] = useFonts({Karla_400Regular, Karla_700Bold})

  return (
    <NativeBaseProvider theme={theme}>
      <StatusBar barStyle='dark-content' translucent/>
      { !fontsLoading ? <Loading/> : <Routes/> }
    </NativeBaseProvider>
  )
}
