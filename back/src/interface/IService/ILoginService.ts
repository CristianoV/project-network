import { IToken } from '../IToken';
import { IError } from '../IError';
import { ILoginData } from '../IData/ILoginData';

export interface ILoginService {
  login({ email, password }: ILoginData): Promise<IToken | IError>;
}
