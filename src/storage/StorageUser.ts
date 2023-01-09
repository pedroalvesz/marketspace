import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./StorageConfig";

import { UserDTO } from "../dtos/UserDTO";



export async function storageUserSave(data: UserDTO) {
  await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(data))
}

export async function storageUserGet() {
  const storage = await AsyncStorage.getItem(USER_STORAGE)

  const user : UserDTO = storage ? JSON.parse(storage) : {}
  
  return user;
}

export async function storageUserRemove() {
  await AsyncStorage.removeItem(USER_STORAGE)
}