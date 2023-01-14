import { createContext, ReactNode, useEffect, useState } from "react";
import { useToast } from "native-base";

import { storageTokenGet, storageTokenRemove, storageTokenSave } from "../storage/StorageToken";
import { storageUserGet, storageUserRemove, storageUserSave } from "../storage/StorageUser";

import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";


export const AppContext = createContext<AppContextDataProps>({} as AppContextDataProps)



export type AppContextDataProps = {
  signIn: (email: string, password: string) => Promise<void>,
  signOut: () => Promise<void>,
  user: UserDTO,
  LoadingUserData: boolean,
}


type ProviderProps = {
  children: ReactNode
}

export function AppContextProvider({ children }: ProviderProps) {

  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [LoadingUserData, setLoadingUserData] = useState(true)

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
    <AppContext.Provider value={{signIn, user, signOut, LoadingUserData}}>
      {children}
    </AppContext.Provider>
  )
}