import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";
import { useAppContext } from "./useAppContext";


export const useNotifyAuth = () => {
  const toast = useToast();
  const { state } = useAppContext();

  return useCallback(() => {
    if (!state.user) {
      toast({
        position: 'bottom',
        status: 'error',
        title: 'Login required',
        description: 'You must login or create a new account first',
      });
      throw new Error('Not authorized');
    }
  }, [toast, state.user]);
};