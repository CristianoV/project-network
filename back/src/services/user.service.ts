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

  public async updatePhrase(authorization: string, phrase: string) {
    const { id } = JwtSecret.verify(authorization);

    const user = await this.model.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (!user) throw new Error('User not found');

    user.phrase = phrase;

    await user.save();

    return 'Phrase updated';
  }

  public async updateProfile(authorization: string, profile: any) {
    const { id } = JwtSecret.verify(authorization);
  
    Object.keys(profile).forEach(key => {
      if (profile[key] === null || profile[key] === 'Data inválida') {
        delete profile[key];
      }
    });
  
    const user = await this.model.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  
    if (!user) {
      throw new Error('User not found');
    }
  
    Object.assign(user, profile);
  
    await user.save();
  
    return 'Profile updated';
  }

  public async getUserById(id: number) {
    const user = await this.model.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    return user;
  }

  public async updateImage({
    authorization,
    profile_picture,
  }: {
    authorization: string;
    profile_picture: string;
  }) {
    const { id } = JwtSecret.verify(authorization);

    const user = await this.model.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
    });

    if (!user) throw new Error('User not found');

    user.profile_picture = profile_picture;

    await user.save();

    return 'Image updated';
  }
}
