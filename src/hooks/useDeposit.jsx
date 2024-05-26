import { useState } from "react";
import instance from "../utils/api";
import { useToast } from "@chakra-ui/react";

export const useDeposit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const depositToEliteplay = async () => {
    const url = '/transactions/deposit';
    setIsLoading(true);
    let responseData = null;

    try {
      const response = await instance.post(url, {});
      console.log(response);

      responseData = response.data;
      if (response.status === 201) {
        toast({
          title: 'Deposit',
          description: responseData?.message || 'Deposit successful',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      } else {
        throw new Error('Failed to deposit');
      }
    } catch (error) {
      toast({
        title: 'Deposit',
        description: responseData?.message || error.response.data.message || 'Failed to deposit',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      console.error('Error occurred during deposit:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    depositToEliteplay,
  };
}