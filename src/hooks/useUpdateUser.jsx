import { useCallback } from "react";
import { LOGIN, SET_USER_LOADING } from "../contexts/AppContext";
import { useAppContext } from "./useAppContext";
import instance from "../utils/api";
import { useToken } from "./useAccessToken";


export const useUpdateUser = () => {
  const { dispatch } = useAppContext();

  const token = useToken();

  const update = useCallback(async () => {
    if (!token) return;
    try {
      const response = await instance.get(
        '/user/me'
      );
      dispatch({ type: SET_USER_LOADING, payload: false });
      if (response.status === 200) {
        const data = response.data;
        dispatch({
          type: LOGIN, payload: {
            ...data,
            balance: parseFloat(data.balance)
          }
        });
      } else {
        console.error('Failed to fetch user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
    }
  }, [dispatch, token])

  return update;
};