class ErrorService {
  constructor() {}
  getErrorMessage = (status: number): string => {
    switch (status) {
      case 401:
        return 'Unauthorized';
      case 500:
        return 'Internal server error';
      default:
        return `HTTP error: ${status}`;
    }
  };
}

export default ErrorService;
