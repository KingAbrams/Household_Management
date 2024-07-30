import { useNavigate } from 'react-router-dom';
import TablePerson from '../../components/person/TablePerson';
import usePersonData from '../../core/hooks/usePersonData';
import { IUsePersonData } from '../../core/types';
import { useEffect } from 'react';
import { useAuth } from '../../core/hooks/useAuth';

const Person = () => {
  const { token } = useAuth();
  console.log('[PERSON]MON CONTEXT', token);
  const navigate = useNavigate();
  const {
    persons,
    isLoading,
    isError,
    status,
    isExpiredToken,
  }: IUsePersonData = usePersonData();

  useEffect(() => {
    if (status === 401) {
      navigate('./login');
      return;
    }
  }, [status, navigate]);

  useEffect(() => {
    if (isExpiredToken) {
      navigate('/login');
    }
  }, [isExpiredToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (isError) {
    return <div>Error fetching data from Person</div>;
  }

  return (
    <div>
      <button onClick={handleLogout}>Déconnexion</button>

      <p>Liste des personnes</p>

      <TablePerson persons={persons} isLoading={isLoading} />
    </div>
  );
};

export default Person;
