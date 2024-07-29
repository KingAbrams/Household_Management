import { HOUSEHOLD_API_HOST } from '../../../core/constants';
import { IPersonFetch } from '../../../core/types/personType';

class PersonService {
  constructeur() {}

  getToken = () => {
    return localStorage.getItem('authToken');
  };

  private getErrorMessage = (status: number): string => {
    switch (status) {
      case 401:
        return 'Unauthorized';
      case 500:
        return 'Internal server error';
      default:
        return `HTTP error: ${status}`;
    }
  };

  fetchPerson = async (): Promise<IPersonFetch> => {
    const token = this.getToken();

    if (!token) {
      throw new Error('[HOUSEHOLD_API] No token found');
    }

    try {
      const response = await fetch(`${HOUSEHOLD_API_HOST}/api/persons`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errMessage = this.getErrorMessage(response.status);
        return {
          success: false,
          status: response.status,
          message: errMessage,
        };
      }

      const data = await response.json();

      return { success: true, status: response.status, data };
    } catch (error) {
      const errMessage = `[HOUSEHOLD_API] Failed to fetch Person data ${error}`;

      return {
        success: false,
        status: 500,
        message: errMessage,
      };
    }
  };
}

export default PersonService;
