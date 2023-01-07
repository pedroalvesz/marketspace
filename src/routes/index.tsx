import { NavigationContainer } from '@react-navigation/native'
import { StackRoutes } from './AuthRoutes'

export function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}
