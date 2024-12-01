import { HOUSEHOLD_API_HOST } from '../../../core/constants';
import { IPersonFetch } from '../../../core/types/personType';
import ErrorService from '../tools/ErrorService';
import FetchInterceptor from '../tools/FetchInterceptor';
import TokenService from './TokenService';

class PersonService {
  private tokenService: TokenService;
  private errorService: ErrorService;
  private fetchInterceptor: FetchInterceptor;

  constructor() {
    this.tokenService = new TokenService();
    this.errorService = new ErrorService();
    this.fetchInterceptor = new FetchInterceptor();
  }

  fetchPerson = async (): Promise<IPersonFetch> => {
    try {
      const token = await this.tokenService.validateToken();

      const response = await this.fetchInterceptor.fetchWithRefresh(
        `${HOUSEHOLD_API_HOST}/api/persons`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        const errMessage = this.errorService.getErrorMessage(response.status);
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
