interface IErrorInterface {
  type: string;
  message: string;
}

export type IError = IErrorInterface | undefined;

export interface IDoor {
  day: string;
  message: string;
  id: number;
}
