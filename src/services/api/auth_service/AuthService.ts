import { AUTH_SERVICE_API_HOST } from '../../../core/constants';
import { IRegister, IResgisterResFetch } from '../../../core/types';

class AuthService {
  constructor() {}

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
}

export default AuthService;
