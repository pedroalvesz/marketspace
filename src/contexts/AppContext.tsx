import { createContext, ReactNode, useState } from "react";
import { UserDTO } from "../dtos/UserDTO";
import { api } from "../services/api";
import { storageUserSave } from "../storage/StorageUser";


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



  async function userAndTokenUpdate(userData : UserDTO, token: string) {
    try {
      await storageUserSave(userData)
      setUser(userData)
    } catch (error) {
      
    }
  }
  

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', {email, password})

      if(data.user && data.token) {
        await userAndTokenUpdate(data.user, data.token)
      }

    } catch (error) {
      
    }
  }

  return(
    <AppContext.Provider value={{signIn, user}}>
      {children}
    </AppContext.Provider>
  )
}