import { ACCESS_TOKEN } from "../utils/constants";
export const isLoggedIn = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const loginTime = localStorage.getItem("loginTime");

  if (token && loginTime) {
    const currentTime = new Date().getTime();
    const expireTime = parseInt(loginTime) + 3600000;
    return currentTime < expireTime;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  return re.test(password);
};
