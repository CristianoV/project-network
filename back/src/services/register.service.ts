import User from '../database/models/user';
import Bcrypt from '../utils/BcryptService';
import JwtSecret from '../utils/JwtService';

export default class RegisterService {
  constructor(private model: typeof User) {}

  public async registerUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const encrypt = Bcrypt.encrypt(password);

    const user = await this.model.create({
      email,
      password: encrypt,
    });
    const token = JwtSecret.sign({ id: user.id, email: user.email });

    return { token };
  }
}
