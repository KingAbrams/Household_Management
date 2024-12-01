import AuthService from '../auth_service/AuthService';

class TokenService {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

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

  validateToken = async () => {
    const token = this.getToken();
    if (!token) {
      throw new Error('[HOUSEHOLD_API] No token found');
    }

    const tokenExp = this.getTokenExpiration(token);
    const isExpired = this.isTokenExpired(tokenExp);

    if (isExpired) {
      try {
        const newToken = await this.authService.getRefreshToken();
        if (newToken) {
          localStorage.setItem('authToken', newToken.accessToken);
          return newToken;
        }
      } catch (error) {
        throw new Error(`[HOUSEHOLD_API] Unable to refresh token ${error}`);
      }
    }

    return token;
  };
}

export default TokenService;
