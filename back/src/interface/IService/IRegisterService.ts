import { IToken } from '../IToken';
import { IError } from '../IError';
import { IRegisterrData } from '../IData/IRegisterData';

export interface IRegisterService {
  register({
    email,
    password,
    firstName,
    lastName,
  }: IRegisterrData): Promise<IToken | IError>;
}
