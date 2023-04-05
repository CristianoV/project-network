import JwtSecret from '../utils/JwtService';
import User from '../database/models/user';
import Bcrypt from '../utils/BcryptService';
import { ILoginService } from '../interface/IService/ILoginService';
import { loginSchema, ILoginData } from '../interface/IData/ILoginData';
import { IToken } from '../interface/IToken';
import { IError } from '../interface/IError';

export default class LoginService implements ILoginService {
  constructor(private model: typeof User) {}

  public async login({ email, password }: ILoginData): Promise<IToken | IError> {
    const parsed = loginSchema.safeParse({ email, password });

    if (!parsed.success) {
      const { message } = parsed.error;
      const customMessage = JSON.parse(message);

      throw new Error(customMessage[0].message);
    }

    const user = await this.model.findOne(
      {
        where: {
          email,
        },
      },
    );

    if (!user) {
      throw new Error('User not found');
    }

    const verifyPassword = Bcrypt.compare(user.password, password);

    if (!verifyPassword) throw new Error('Incorrect email or password');

    const token = JwtSecret.sign({ id: user.id, email: user.email });

    return { token };
  }
}
