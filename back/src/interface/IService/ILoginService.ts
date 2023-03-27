import { IToken } from '../IToken';
import { IError } from '../IError';
import { IUserData } from '../IData/IUserData';

export interface ILoginService {
  login({ email, password }: IUserData): Promise<IToken | IError>;
}
