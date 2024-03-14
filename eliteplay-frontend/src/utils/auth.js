export const isLoggedIn = () => {
    const token = localStorage.getItem('authToken');
    // return token !== null;
    return true
  };