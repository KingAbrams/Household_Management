export const isAuthenticated = () => {
  const isExist = localStorage.getItem('authToken') !== null;
  return isExist;
};
