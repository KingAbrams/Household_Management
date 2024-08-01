import { useNavigate } from 'react-router-dom';
import TablePerson from '../../components/person/TablePerson';
import usePersonData from '../../core/hooks/usePersonData';
import { IUsePersonData } from '../../core/types';
import { useEffect } from 'react';
import { useAuth } from '../../core/hooks/useAuth';

const Person = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { persons, isLoading, isError, isInvalidToken }: IUsePersonData =
    usePersonData();

  useEffect(() => {
    if (isInvalidToken) {
      navigate('/login');
    }
  }, [isInvalidToken, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authRefreshToken');
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
