import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../utils/constants";


export const useToken = () => {
  const [access, setAccess] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setAccess(token);
  }, []);

  return access;
};