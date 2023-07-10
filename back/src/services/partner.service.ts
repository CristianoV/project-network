import JwtSecret from '../utils/JwtService';
import Partners from '../database/models/partners';
import User from '../database/models/user';
import Group from '../database/models/groups';
import IPartnerService from '../interface/IService/IPartnerService';

export default class PartnerService implements IPartnerService<Partners> {
  constructor(private model: typeof Partners) {}

  public async getPartners(authorization: string) {
    const { id } = await JwtSecret.verify(authorization);
    const partners = await this.model.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Group,
          as: 'group',
        },
      ],
    });

    return partners;
  }

  public async getPartnersByUserId(id: number) {
    const partners = await this.model.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: Group,
          as: 'group',
        },
      ],
    });

    return partners;
  }

  public async getPartnerByGroupId(id: number) {
    const partners = await this.model.findAll({
      where: {
        group_id: id,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
      ],
    });

    return partners;
  }

  public async createPartner({
    authorization,
    groupId,
  }: {
    authorization: string;
    groupId: number;
  }) {
    const { id } = await JwtSecret.verify(authorization);
    const partner = await this.model.create({
      user_id: id,
      group_id: groupId,
    });

    return partner;
  }

  public async isPartner({
    authorization,
    groupId,
  }: {
    authorization: string;
    groupId: number;
  }) {
    const { id } = await JwtSecret.verify(authorization);
    const partner = await this.model.findOne({
      where: {
        user_id: id,
        group_id: groupId,
      },
    });

    if (partner) {
      return true;
    } else {
      return false;
    }
  }

  public async deletePartner({
    authorization,
    groupId,
  }: {
    authorization: string;
    groupId: number;
  }) {
    const { id } = await JwtSecret.verify(authorization);
    const partner = await this.model.destroy({
      where: {
        user_id: id,
        group_id: groupId,
      },
    });

    return partner;
  }
}
