import { createContext, ReactNode, useState } from 'react';

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface IAuthContext {
  token: string | null;
  getTokenExpiration: (token: string) => number;
  isTokenExpired: (tokenExpiration: number) => boolean;
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  getTokenExpiration: () => 0,
  isTokenExpired: () => false,
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  const getTokenExpiration = (token: string) => {
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const payloadParsed = JSON.parse(payloadDecoded);
    const tokenExpiration = payloadParsed.exp;

    return tokenExpiration;
  };

  const isTokenExpired = (tokenExpiration: number) => {
    const dateNow = new Date();
    const timeInSeconds = dateNow.getTime() / 1000;

    return timeInSeconds > tokenExpiration;
  };

  return (
    <AuthContext.Provider value={{ token, getTokenExpiration, isTokenExpired }}>
      {children}
    </AuthContext.Provider>
  );
};
