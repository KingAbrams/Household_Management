import { createContext, ReactNode, useState } from 'react';

interface AuthContextProviderProps {
  children: ReactNode;
}

export interface IAuthContext {
  token: string | null;
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};
