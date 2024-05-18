import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";


// Custom hook to access the context
export const useAppContext = () => {
  return useContext(AppContext);
};