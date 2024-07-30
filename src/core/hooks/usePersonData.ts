import { useEffect, useState } from 'react';
import { IPerson, IThowError, IUsePersonData } from '../types';
import PersonService from '../../services/api/household_management/PersonService';
import { IPersonFetchSuccess } from '../types/personType';

const usePersonData = (): IUsePersonData => {
  const [persons, setPersons] = useState<IPerson[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [isExpiredToken, setIsExpiredToken] = useState(false);

  useEffect(() => {
    const fetchPersonData = async () => {
      setIsLoading(true);
      setIsExpiredToken(false);

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
        const errorToken = error as IThowError;

        setIsError(true);

        if (errorToken.message.includes('Token expired')) {
          setIsExpiredToken(true);
        } else {
          console.error(
            '[HOUSEHOLD_API] Error fetching data from Person:',
            error,
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonData();
  }, []);

  return { persons, isLoading, isError, status, isExpiredToken };
};

export default usePersonData;
