import User from '../database/models/user';
import Bcrypt from '../utils/BcryptService';
import JwtSecret from '../utils/JwtService';

export default class RegisterService {
  constructor(private model: typeof User) {}

  public async registerUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const encrypt = Bcrypt.encrypt(password);

    const user = await this.model.create({
      username,
      password: encrypt,
    });
    const token = JwtSecret.sign({ id: user.id, username: user.username });

    return { token };
  }
}
