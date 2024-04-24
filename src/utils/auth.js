export const isLoggedIn = () => {
    const token = localStorage.getItem('accessToken');
    const loginTime = localStorage.getItem('loginTime');

    if (token && loginTime) {
      const currentTime = new Date().getTime();
      const expireTime = parseInt(loginTime) + 3600000;
      return currentTime < expireTime;
    } else {
      return false;
    }
  };