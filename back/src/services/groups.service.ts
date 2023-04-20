import Groups from '../database/models/groups';
import User from '../database/models/user';
import { IGroupsService } from '../interface/IService/IGroupsService';
import JwtSecret from '../utils/JwtService';

export default class GroupsService implements IGroupsService<Groups> {
  constructor(private model: typeof Groups) {}

  public async getGroupsByUserId(id: number) {
    const groups = await this.model.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
    });

    return groups;
  }

  public async createGroup(
    name: string,
    description: string,
    authorization: string
  ) {
    const { id } = await JwtSecret.verify(authorization);
    const group = await this.model.create({
      name,
      description,
      user_id: id,
    });
    return group;
  }

  public async deleteGroup(id: number) {
    const group = await this.model.destroy({
      where: {
        id,
      },
    });
    return group;
  }
}
