import { useEffect, useState } from 'react';
import { IPerson, IThowError, IUsePersonData } from '../types';
import PersonService from '../../services/api/household_management/PersonService';
import { IPersonFetchError, IPersonFetchSuccess } from '../types/personType';

const usePersonData = (): IUsePersonData => {
  const [persons, setPersons] = useState<IPerson[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [status, setStatus] = useState<number | null>(null);
  const [isInvalidToken, setIsInvalidToken] = useState(false);

  useEffect(() => {
    const fetchPersonData = async () => {
      setIsLoading(true);
      setIsInvalidToken(false);

      try {
        const personService = new PersonService();
        const response = await personService.fetchPerson();

        if (response.success) {
          const personData = response as IPersonFetchSuccess;
          const data: IPerson[] = personData.data.data;

          setPersons(data);
        } else {
          const personData = response as IPersonFetchError;
          const message = personData.message;
          const errMsgInvalidToken = 'Error refreshing token';
          setIsError(true);

          if (message.includes(errMsgInvalidToken)) {
            setIsInvalidToken(true);
          }
        }

        setStatus(response.status);
      } catch (error) {
        const errorToken = error as IThowError;
        const errMsgExpiredToken =
          '[HOUSEHOLD_API] Error fetching data from Person:';

        setIsError(true);
        setIsInvalidToken(true);

        console.error(errMsgExpiredToken, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersonData();
  }, []);

  return { persons, isLoading, isError, status, isInvalidToken };
};

export default usePersonData;
