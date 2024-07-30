import { useContext } from 'react';
import { AuthContext } from '../../components/contexts/AuthContext';

export const useAuth = () => {
  return useContext(AuthContext);
};
