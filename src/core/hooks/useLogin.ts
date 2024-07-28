import { useState } from 'react';
import AuthService from '../../services/api/auth_service/AuthService';
import { IData, ILogin } from '../types';

const useLogin = () => {
  const [data, setData] = useState<IData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  const resetError = () => {
    setIsError(false);
  };

  const login = async (params: ILogin): Promise<void> => {
    setIsLoading(true);
    setData(null);
    setIsError(false);
    setStatus(null);

    try {
      const authService = new AuthService();
      const response = await authService.login(params);

      if (response.success) {
        setData(response.data);
      } else {
        setIsError(true);
      }

      setStatus(response.status);
    } catch (error) {
      setIsError(true);
      console.error('[AUTH_SERVICE_API] Error loggin user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return { login, resetError, data, isError, status, isLoading };
};

export default useLogin;
