import { AxiosError } from "axios"
import { Toast } from "native-base"
import { AppError } from "./AppError"

type Props = {
  error: AxiosError | string;
}

export function ErrorToast({error} : Props) {
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