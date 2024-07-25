import { useEffect, useState } from 'react';
import { IPerson, IUsePersonData } from '../types';
import PersonService from '../../services/api/household_management/PersonService';

const usePersonData = (): IUsePersonData => {
  const [persons, setPersons] = useState<IPerson[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPersonData = async () => {
      setIsLoading(true);
      try {
        const personService = new PersonService();
        const personData = await personService.fetchPerson();

        setPersons(personData.data);
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

  return { persons, isLoading, isError };
};

export default usePersonData;
