import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { storageTokenGet, storageTokenSave } from "../storage/StorageToken";
import { storageUserGet, storageUserSave } from "../storage/StorageUser";


export const AppContext = createContext<AppContextDataProps>({} as AppContextDataProps)



export type AppContextDataProps = {
  signIn: (email: string, password: string) => Promise<void>,
  user: UserDTO,
}


type ProviderProps = {
  children: ReactNode
}

export function AppContextProvider({ children }: ProviderProps) {

  const [user, setUser] = useState<UserDTO>({} as UserDTO)




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

  async function loadUserData() {
    try {
      const userLogged = await storageUserGet()
      const userToken = await storageTokenGet()

      if(userLogged && userToken) {
        await userAndTokenUpdate(userLogged, userToken)
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    loadUserData()
  },[])

  return(
    <AppContext.Provider value={{signIn, user}}>
      {children}
    </AppContext.Provider>
  )
}