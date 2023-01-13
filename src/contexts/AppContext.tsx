import { createContext, ReactNode, useEffect, useState } from "react";
import { useToast } from "native-base";

import { storageTokenGet, storageTokenRemove, storageTokenSave } from "../storage/StorageToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/StorageUser";

import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { AppError } from "../utils/AppError";



export const AppContext = createContext<AppContextDataProps>({} as AppContextDataProps)



export type AppContextDataProps = {
  signIn: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>,
  ErrorToast: (error: any) => any,
  user: UserDTO,
  LoadingUserData: boolean,
}


type ProviderProps = {
  children: ReactNode
}

export function AppContextProvider({ children }: ProviderProps) {

  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [LoadingUserData, setLoadingUserData] = useState(true)

  const toast = useToast()


  function ErrorToast(error) {
    const isAppError = error instanceof AppError
    const title = isAppError ? error.message : 'Server Error. Please try again later.'

    return(
      toast.show({
        title,
        bg: 'red.500',
        placement: 'top',
      })
    )
  }

  async function userAndTokenSave(userData : UserDTO, token: string) {
    try {
      await storageUserSave(userData)
      await storageTokenSave(token)
    } catch (error) {
      throw error
    }
  }

  async function userAndTokenUpdate(userData : UserDTO, token: string) {
    try {

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(userData)

    } catch (error) {
      throw error
    }
  }
  

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {email, password})

      if(data.user && data.token) {
        await userAndTokenSave(data.user, data.token)
        await userAndTokenUpdate(data.user, data.token)
      }

    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      await storageUserRemove()
      await storageTokenRemove()

      setUser({} as UserDTO)
    } catch (error) {
      throw error
    }
  }

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()
      const userToken = await storageTokenGet()

      if(userLogged && userToken) {
        await userAndTokenUpdate(userLogged, userToken)
      }
    } catch (error) {
      
    } finally {
      setLoadingUserData(false)
    }
  }

  useEffect(() => {
    loadUserData()
  },[])

  return(
    <AppContext.Provider value={{signIn, user, signOut, ErrorToast, LoadingUserData}}>
      {children}
    </AppContext.Provider>
  )
}