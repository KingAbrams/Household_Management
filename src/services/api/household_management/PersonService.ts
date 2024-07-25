import { HOUSEHOLD_API_HOST } from '../../../core/constants';
import { IPersonResFetch } from '../../../core/types';

class PersonService {
  constructeur() {}

  fetchPerson = async (): Promise<IPersonResFetch> => {
    try {
      const response = await fetch(`${HOUSEHOLD_API_HOST}/api/persons`);

      if (!response.ok) {
        const message = `[HOUSEHOLD_API] HTTP error! Status: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      const errMessage = `[HOUSEHOLD_API] Failed to fetch Person data ${error}`;
      throw new Error(errMessage);
    }
  };
}

export default PersonService;
