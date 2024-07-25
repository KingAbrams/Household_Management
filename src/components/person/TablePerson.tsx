import { IPerson } from '../../core/types';

interface ITablePersonProps {
  persons: IPerson[] | null;
  isLoading: boolean | null;
}

const TablePerson = ({ persons, isLoading }: ITablePersonProps) => {
  const hasData = persons && persons.length > 0;
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Profession</th>
        </tr>
      </thead>

      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan={4}>Loading...</td>
          </tr>
        ) : hasData ? (
          persons.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.lastname}</td>
              <td>{person.firstname ?? 'N/A'}</td>
              <td>{person.job ?? 'N/A'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4}>No data available</td>
          </tr>
        )}
      </tbody>

      <tfoot></tfoot>
    </table>
  );
};

export default TablePerson;
