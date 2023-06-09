import Groups from '../database/models/groups';
import User from '../database/models/user';
import Partner from '../database/models/partners';
import { IGroupsService } from '../interface/IService/IGroupsService';
import JwtSecret from '../utils/JwtService';

export default class GroupsService implements IGroupsService<Groups> {
  constructor(
    private model: typeof Groups,
    private partnerModel: typeof Partner
  ) {}

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

  public async createGroup({
    name,
    description,
    authorization,
    language,
    category,
    type,
    country,
    profile_picture,
  }: {
    name: string;
    description: string;
    authorization: string;
    language: string;
    category: string;
    type: string;
    country: string;
    profile_picture: string | null;
  }) {
    const { id } = await JwtSecret.verify(authorization);

    if (!id) {
      throw new Error('Invalid token');
    }

    if (!name || !description || !type) {
      throw new Error('Invalid data');
    }

    const group = await this.model.create({
      name,
      description,
      language,
      category,
      type,
      country,
      profile_picture: profile_picture || null,
      owner_id: id,
    });

    const partner = await this.partnerModel.create({
      user_id: id,
      group_id: group.id,
    });

    return group;
  }

  public async deleteGroup(id: number, authorization: string) {
    const { id: userId } = await JwtSecret.verify(authorization);
    const group = await this.model.destroy({
      where: {
        id,
        owner_id: userId,
      },
    });
    return group;
  }

  public async updateImage({
    id,
    authorization,
    profile_picture,
  }: {
    id: number;
    authorization: string;
    profile_picture: string | null;
  }) {
    const { id: userId } = await JwtSecret.verify(authorization);

    if (!userId) {
      throw new Error('Invalid token');
    }

    const group = await this.model.update(
      {
        profile_picture: profile_picture || null,
      },
      {
        where: {
          id,
          owner_id: userId,
        },
      }
    );

    return group;
  }
}
