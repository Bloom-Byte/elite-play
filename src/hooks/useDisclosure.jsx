import { useCallback, useEffect, useState } from "react";
import { DEC_MODAL, INC_MODAL } from "../contexts/AppContext";
import { useAppContext } from "./useAppContext";


export const useDisclosure = () => {
  const { state, dispatch } = useAppContext();

  useEffect(() => {
    if (state.openedModals > 0) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [state.openedModals]);

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
    dispatch({ type: INC_MODAL });
  }, [dispatch]);

  const onClose = useCallback(() => {
    setIsOpen(false);
    dispatch({ type: DEC_MODAL });
  }, [dispatch]);
  return { isOpen, onOpen, onClose };
};