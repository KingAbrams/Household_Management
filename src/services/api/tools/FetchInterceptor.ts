import AuthService from '../auth_service/AuthService';

class FetchInterceptor {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  fetchWithRefresh = async (
    url: string,
    options: RequestInit = {},
  ): Promise<Response> => {
    let accessToken = localStorage.getItem('authToken');
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      const result = await this.authService.getRefreshToken();

      if (!result) {
        throw new Error("Refresh Token 'failed'");
      }

      accessToken = result.accessToken;
      localStorage.setItem('authToken', accessToken);

      const newHeaders = {
        ...options.headers,
        Authorization: `Bearer ${result.accessToken}`,
      };

      const refreshedResponse = await fetch(url, {
        ...options,
        headers: newHeaders,
      });

      return refreshedResponse;
    }
    return response;
  };
}

export default FetchInterceptor;
