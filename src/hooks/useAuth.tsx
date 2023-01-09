import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";


export function useAuth() {
  const context = useContext(AppContext)
  
  return context;
}