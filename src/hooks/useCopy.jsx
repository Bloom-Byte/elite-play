import { useCallback } from "react";
import { useToast } from "@chakra-ui/react";


export const useCopyToClipboard = () => {
  const toast = useToast();

  const copyToClipboard = useCallback((text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;

    document.body.appendChild(tempInput);

    tempInput.select();

    document.execCommand('copy');

    document.body.removeChild(tempInput);

    toast({
      position: 'bottom',
      status: 'success',
      title: 'Copied!',
      description: 'Copied to clipboard: ' + text,
    });
  }, [toast]);

  return copyToClipboard;
};