import { NavigationContainer } from '@react-navigation/native'
import { Loading } from '../components/Loading'
import { UserProductsProvider } from '../contexts/UserProductsContext'
import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export function Routes() {

  const {user, LoadingUserData} = useAuth()

  if(LoadingUserData) {
    <Loading/>
  }

  return (
    <NavigationContainer>
      {user.id
      ? 
        <UserProductsProvider>
          <AppRoutes/>
        </UserProductsProvider>
      : 
        <AuthRoutes/>
      }
    </NavigationContainer>
  )
}
