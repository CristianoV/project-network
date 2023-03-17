import JwtSecret from '../utils/JwtService';
import User from '../database/models/user';
import Bcrypt from '../utils/BcryptService';

export default class LoginService {
  constructor(private model: typeof User) {}

  public async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = await this.model.findOne({
      where: {
        username,
      },
      raw: true,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const verifyPassword = Bcrypt.compare(user.password, password);

    if (!verifyPassword) throw new Error('Incorrect email or password');

    const token = JwtSecret.sign({ id: user.id, username: user.username });

    return { token };
  }
}
