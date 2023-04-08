import { IError } from '../interface/IError';
import { IToken } from '../interface/IToken';
import User from '../database/models/user';
import Bcrypt from '../utils/BcryptService';
import JwtSecret from '../utils/JwtService';
import {
  IRegisterrData,
  registerSchema,
} from '../interface/IData/IRegisterData';
import { IRegisterService } from '../interface/IService/IRegisterService';

export default class RegisterService implements IRegisterService {
  constructor(private model: typeof User) {}

  public async registerUser({
    email,
    password,
    firstName,
    lastName,
  }: IRegisterrData): Promise<IToken | IError> {
    const parsed = registerSchema.safeParse({
      email,
      password,
      firstName,
      lastName,
    });

    if (!parsed.success) {
      const { message } = parsed.error;
      const customMessage = JSON.parse(message);

      throw new Error(customMessage[0].message);
    }
    const encrypt = Bcrypt.encrypt(password);

    const user = await this.model.create({
      email,
      password: encrypt,
      firstName,
      lastName,
    });

    const token = JwtSecret.sign({ id: user.id, email: user.email });

    return { token };
  }
}
