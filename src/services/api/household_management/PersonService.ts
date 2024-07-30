import { HOUSEHOLD_API_HOST } from '../../../core/constants';
import { IThowError } from '../../../core/types';
import { IPersonFetch } from '../../../core/types/personType';

class PersonService {
  constructeur() {}

  getToken = () => {
    return localStorage.getItem('authToken');
  };

  getTokenExpiration = (token: string) => {
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const payloadParsed = JSON.parse(payloadDecoded);
    const tokenExpiration = payloadParsed.exp;

    return tokenExpiration;
  };

  isTokenExpired = (tokenExpiration: number) => {
    const dateNow = new Date();
    const timeInSeconds = dateNow.getTime() / 1000;

    return timeInSeconds > tokenExpiration;
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

    const tokenExp = this.getTokenExpiration(token);

    const isExpired = this.isTokenExpired(tokenExp);

    if (isExpired) {
      const err: IThowError = new Error('[HOUSEHOLD_API] Token expired');
      localStorage.removeItem('authToken');

      throw err;
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
