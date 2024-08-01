export interface IRegister {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface IResgisterResFetch {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

export interface IAlert {
  type: 'warning' | 'success';
  message: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IData {
  accessToken: string;
  refreshToken: string;
  user: IResgisterResFetch;
}

export interface ILoginResError {
  success: boolean;
  status: number;
  error: boolean;
  message: string;
  data: null;
}

export interface ILoginResSuccess {
  success: boolean;
  status: number;
  data: IData;
}

export interface IResRefreshToken {
  message: string;
  accessToken: string;
}
