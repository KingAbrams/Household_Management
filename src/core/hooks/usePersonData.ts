import { useEffect, useState } from 'react';
import { IPerson, IUsePersonData } from '../types';
import PersonService from '../../services/api/household_management/PersonService';
import { IPersonFetchSuccess } from '../types/personType';

const usePersonData = (): IUsePersonData => {
  const [persons, setPersons] = useState<IPerson[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchPersonData = async () => {
      setIsLoading(true);

      try {
        const personService = new PersonService();
        const response = await personService.fetchPerson();

        if (response.success) {
          const personData = response as IPersonFetchSuccess;
          const data: IPerson[] = personData.data.data;

          setPersons(data);
        } else {
          setIsError(true);
        }

        setStatus(response.status);
      } catch (error) {
        setIsError(true);

        console.error(
          '[HOUSEHOLD_API] Error fetching data from Person:',
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonData();
  }, []);

  return { persons, isLoading, isError, status };
};

export default usePersonData;
