import { useNavigate } from 'react-router-dom';
import TablePerson from '../../components/person/TablePerson';
import usePersonData from '../../core/hooks/usePersonData';
import { IUsePersonData } from '../../core/types';
import { useEffect } from 'react';

const Person = () => {
  const navigate = useNavigate();
  const { persons, isLoading, isError, status }: IUsePersonData =
    usePersonData();

  useEffect(() => {
    if (status === 401) {
      navigate('./login');
      return;
    }
  }, [status, navigate]);

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
