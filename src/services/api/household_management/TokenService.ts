import { IThowError } from '../../../core/types';

class TokenService {
  constructor() {}

  private getToken = () => {
    return localStorage.getItem('authToken');
  };

  private getTokenExpiration = (token: string) => {
    const payload = token.split('.')[1];
    const payloadDecoded = atob(payload);
    const payloadParsed = JSON.parse(payloadDecoded);
    const tokenExpiration = payloadParsed.exp;

    return tokenExpiration;
  };

  private isTokenExpired = (tokenExpiration: number) => {
    const dateNow = new Date();
    const timeInSeconds = dateNow.getTime() / 1000;

    return timeInSeconds > tokenExpiration;
  };

  //   private isAuthenticated = (token: string | null) => {
  //     if (!token) return false;
  //     const tokenExp = this.getTokenExpiration(token);
  //     const isExpired = this.isTokenExpired(tokenExp);
  //     return isExpired;
  //   };

  validateToken = () => {
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
    return token;
  };
}

export default TokenService;
