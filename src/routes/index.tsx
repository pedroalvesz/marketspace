import { NavigationContainer } from '@react-navigation/native'
import { StackRoutes } from './stack'

export function Routes() {
  return (
    <NavigationContainer>
      <StackRoutes />
    </NavigationContainer>
  )
}
