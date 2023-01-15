import { Toast } from "native-base"
import { AppError } from "./AppError"

export function ErrorToast(error) {
  const isAppError = error instanceof AppError
  const title = isAppError ? error.message : 'Server Error. Please try again later.'

  return(
    Toast.show({
      title,
      bg: 'red.500',
      placement: 'top',
    })
  )
}