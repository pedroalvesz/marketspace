import { Toast } from "native-base"

export function CustomToast(type: 'success' | 'warning', title: string) {
  return(
    Toast.show({
      title,
      bg: type === 'success' ? 'blue_primary' : 'yellow.500',
      placement: 'top',
      mx: 4,
    })
  )
}