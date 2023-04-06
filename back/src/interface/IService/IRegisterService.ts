import { IToken } from '../IToken';
import { IError } from '../IError';
import { IRegisterrData } from '../IData/IRegisterData';

export interface IRegisterService {
  registerUser({
    email,
    password,
    firstName,
    lastName,
  }: IRegisterrData): Promise<IToken | IError>;
}
