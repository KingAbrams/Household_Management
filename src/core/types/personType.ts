export interface IPersonResFetch {
  data: IPerson[];
  message: string;
}

export interface IPerson {
  id: number;
  firstname: string | null;
  lastname: string;
  birthday: string;
  cin: string | null;
  nationality: string;
  linkWithChief: string;
  job: string | null;
  otherSource: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUsePersonData {
  persons: IPerson[] | null;
  isLoading: boolean;
  isError: boolean;
}