import { AUTH_SERVICE_API_HOST } from '../../../core/constants';
import {
  ILogin,
  ILoginResError,
  ILoginResSuccess,
  IRegister,
  IResgisterResFetch,
  IResRefreshToken,
} from '../../../core/types';
import ErrorService from '../tools/ErrorService';

class AuthService {
  private errorService: ErrorService;
  constructor() {
    this.errorService = new ErrorService();
  }

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
        const errMessage = this.errorService.getErrorMessage(response.status);

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

  getRefreshToken = async (): Promise<IResRefreshToken> => {
    try {
      const response = await fetch(
        `${AUTH_SERVICE_API_HOST}/auth/refreshToken`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authRefreshToken')}`,
          },
        },
      );

      const responseBody = await response.json();

      if (!response.ok) {
        const apiPrefix = '[AUT_SERVICE_API] ';
        const statusCode = `Status Code: ${response.status}`;
        const errorMessage =
          responseBody.error || responseBody.message || 'Unknown error';

        const errorFullMessage = `${apiPrefix}${statusCode}\n${errorMessage}`;
        throw new Error(errorFullMessage);
      }

      const data = responseBody;

      return data;
    } catch (error) {
      const errMessage = `[AUT_SERVICE_API] Error refreshing token: ${error}`;
      throw new Error(errMessage);
    }
  };
}

export default AuthService;
