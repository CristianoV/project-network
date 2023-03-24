import { IError } from '../interface/IError';
import { IToken } from '../interface/IToken';
import User from '../database/models/user';
import Bcrypt from '../utils/BcryptService';
import JwtSecret from '../utils/JwtService';
import { IUserData, userSchema } from '../interface/IData/IUserData';

export default class RegisterService {
  constructor(private model: typeof User) {}

  public async registerUser({
    email,
    password,
  }: IUserData): Promise<IToken | IError> {
    const parsed = userSchema.safeParse({ email, password });

    if (!parsed.success) {
      const { message } = parsed.error;
      const customMessage = JSON.parse(message);

      throw new Error(customMessage[0].message);
    }
    const encrypt = Bcrypt.encrypt(password);

    const user = await this.model.create({
      email,
      password: encrypt,
    });
    const token = JwtSecret.sign({ id: user.id, email: user.email });

    return { token };
  }
}
