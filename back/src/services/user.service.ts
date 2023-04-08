import User from '../database/models/user';
import JwtSecret from '../utils/JwtService';
import IUserService from '../interface/IService/IUserService';

export default class UserService implements IUserService<User> {
  constructor(private model: typeof User) {}

  public async getUser(authorization: string) {
    const { id } = JwtSecret.verify(authorization);

    const user = await this.model.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (!user) throw new Error('User not found');

    return user;
  }
}
