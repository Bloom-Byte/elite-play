export const isLoggedIn = () => {
    const token = localStorage.getItem('accessToken');
    return token !== null;
  };