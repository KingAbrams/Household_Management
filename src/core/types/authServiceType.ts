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
