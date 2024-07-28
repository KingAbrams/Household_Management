import { AUTH_SERVICE_API_HOST } from '../../../core/constants';
import {
  ILogin,
  ILoginResError,
  ILoginResSuccess,
  IRegister,
  IResgisterResFetch,
} from '../../../core/types';

class AuthService {
  constructor() {}

  private getErrorMessage = (status: number): string => {
    switch (status) {
      case 401:
        return 'Email or password invalid';
      case 500:
        return 'Internal server error';
      default:
        return `HTTP error: ${status}`;
    }
  };

  register = async ({
    firstname,
    lastname,
    email,
    password,
  }: IRegister): Promise<IResgisterResFetch> => {
    try {
      const response = await fetch(`${AUTH_SERVICE_API_HOST}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorMessage = `[AUTHSERVICE_API] HTTP error! Status: ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      const errMessage = `[AUT_SERVICE_API] Register failed ${error}`;
      throw new Error(errMessage);
    }
  };

  login = async ({
    email,
    password,
  }: ILogin): Promise<ILoginResSuccess | ILoginResError> => {
    try {
      const response = await fetch(`${AUTH_SERVICE_API_HOST}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errMessage = this.getErrorMessage(response.status);

        return {
          success: false,
          status: response.status,
          error: true,
          message: errMessage,
          data: null,
        };
      }

      const data = await response.json();

      return { success: true, status: response.status, data };
    } catch (error) {
      const errMessage = `[AUT_SERVICE_API] Internal Server Error ${error}`;

      return {
        success: false,
        status: 500,
        error: true,
        message: errMessage,
        data: null,
      };
    }
  };
}

export default AuthService;
