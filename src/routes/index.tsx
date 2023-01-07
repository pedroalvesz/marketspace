import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './AuthRoutes'

export function Routes() {
  return (
    <NavigationContainer>
      <AuthRoutes />
    </NavigationContainer>
  )
}
