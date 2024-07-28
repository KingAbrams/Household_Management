import { useState } from 'react';
import AuthService from '../../services/api/auth_service/AuthService';
import { IRegister, IResgisterResFetch } from '../types';

const useRegister = () => {
  const [data, setData] = useState<IResgisterResFetch | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const register = async (params: IRegister): Promise<void> => {
    setData(null);
    setIsLoading(true);
    setIsError(false);

    try {
      const authService = new AuthService();
      const response = await authService.register(params);
      setData(response);
    } catch (error) {
      setIsError(true);
      console.error('[AUTH_SERVICE_API] Error registration user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetError = () => {
    setIsError(false);
  };

  return { register, resetError, data, isLoading, isError };
};

export default useRegister;
