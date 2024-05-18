import { createContext, useReducer, useEffect, useCallback } from "react";
import instance from "../utils/api";
import { ACCESS_TOKEN } from "../utils/constants";

// Define the initial state
const initialState = {
  user: null,
  isNavOpen: true,
  chatOpen: window.innerWidth > 768,
  userLoading: false,
  openedModals: 0,
};

// Create a context
export const AppContext = createContext({
  state: initialState,
  // eslint-disable-next-line no-unused-vars
  dispatch: (data) => { },
});

// Define actions
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SET_NAV = "SET_NAV";
export const SET_CHAT = "SET_CHAT";
export const SET_USER_LOADING = "SET_USER_LOADING";
export const SET_MODAL = "SET_MODAL";
export const INC_MODAL = "INC_MODAL";
export const DEC_MODAL = "DEC_MODAL";

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action?.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case SET_NAV:
      return {
        ...state,
        isNavOpen: action.payload,
      };
    case SET_CHAT:
      return {
        ...state,
        chatOpen: action.payload,
      };
    case SET_USER_LOADING:
      return {
        ...state,
        userLoading: action.payload,
      };
    case SET_MODAL:
      return {
        ...state,
        openedModals: action.payload,
      };
    case INC_MODAL:
      return {
        ...state,
        openedModals: state.openedModals + 1,
      };
    case DEC_MODAL:
      return {
        ...state,
        openedModals: state.openedModals - 1,
      };
    default:
      return state;
  }
};

// Context provider
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const fetchUserProfile = useCallback(async () => {
    try {
      dispatch({ type: SET_USER_LOADING, payload: true });
      const response = await instance.get(
        '/user/me'
      );
      dispatch({ type: SET_USER_LOADING, payload: false });
      if (response.status === 200) {
        const data = response.data;
        dispatch({ type: LOGIN, payload: data });
      } else {
        console.error('Failed to fetch user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error.message);
      dispatch({ type: SET_USER_LOADING, payload: false });
    }
  }, [])

  useEffect(() => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    if (accessToken) {
      fetchUserProfile();
    }
    dispatch({ type: SET_CHAT, payload: window.innerWidth > 768 })
  }, [fetchUserProfile]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
