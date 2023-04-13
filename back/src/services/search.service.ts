import { Op } from 'sequelize';
import Users from '../database/models/user';
import Groups from '../database/models/groups';
import IISearchService from '../interface/IService/ISearchService';

export default class SearchService implements IISearchService<Users | Groups> {
  constructor(
    private userModel: typeof Users,
    private comunityModel: typeof Groups
  ) {}

  public async getUserAndComunitiesByName(name: string) {
    const users = await this.userModel.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${name}%` } },
          { lastName: { [Op.iLike]: `%${name}%` } },
        ],
      },
      attributes: { exclude: ['password'] },
    });

    const comunities = await this.comunityModel.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });

    return [...users, ...comunities];
  }

  public async getUsersByName(name: string) {
    const users = await this.userModel.findAll({
      where: {
        [Op.or]: [
          { firstName: { [Op.iLike]: `%${name}%` } },
          { lastName: { [Op.iLike]: `%${name}%` } },
        ],
      },
      attributes: { exclude: ['password'] },
    });

    return users;
  }

  public async getComunitiesByName(name: string) {
    const comunities = await this.comunityModel.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` },
      },
    });

    return comunities;
  }
}
