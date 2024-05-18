import { SET_CHAT, SET_NAV } from "../contexts/AppContext";
import { useAppContext } from "./useAppContext";


export const useChat = () => {
  const { state, dispatch } = useAppContext();
  function toggleChat() {
    dispatch({ type: SET_CHAT, payload: !state.chatOpen });
  }
  function closeChat() {
    dispatch({ type: SET_CHAT, payload: false });
  }
  function openChat() {
    dispatch({ type: SET_CHAT, payload: true });
  }
  function setChat(value) {
    dispatch({ type: SET_CHAT, payload: value });
  }
  return { chatOpen: state.chatOpen, toggleChat, closeChat, openChat, setChat };
};

export const useNav = () => {
  const { state, dispatch } = useAppContext();
  function toggleNav() {
    dispatch({ type: SET_NAV, payload: !state.isNavOpen });
  }
  function closeNav() {
    dispatch({ type: SET_NAV, payload: false });
  }
  function openNav() {
    dispatch({ type: SET_NAV, payload: true });
  }
  function setNav(value) {
    dispatch({ type: SET_NAV, payload: value });
  }
  return { isNavOpen: state.isNavOpen, toggleNav, closeNav, openNav, setNav };
};