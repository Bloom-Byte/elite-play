import { useCallback } from "react";
import { ACCESS_TOKEN } from "../utils/constants";
import { useAppContext } from "./useAppContext";
import { LOGOUT } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";


export const useLogout = () => {
  const { dispatch } = useAppContext();
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch({ type: LOGOUT });
    navigate('/');
  }, [dispatch, navigate]);

  return logout;
};