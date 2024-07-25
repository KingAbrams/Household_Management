import TablePerson from '../../components/person/TablePerson';
import usePersonData from '../../core/hooks/usePersonData';
import { IUsePersonData } from '../../core/types';

const Person = () => {
  const { persons, isLoading, isError }: IUsePersonData = usePersonData();

  if (isError) {
    return <div>Error fetching data from Person</div>;
  }

  return (
    <div>
      <p>Liste des personnes</p>

      <TablePerson persons={persons} isLoading={isLoading} />
    </div>
  );
};

export default Person;
