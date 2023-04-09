import JwtSecret from '../utils/JwtService';
import Partners from '../database/models/partners';
import User from '../database/models/user';
import Group from '../database/models/groups';

export default class PartnerService {
  constructor(private model: typeof Partners) {}

  public async getPartners(authorization: string) {
    const { id: userId } = await JwtSecret.verify(authorization);
    const partners = await this.model.findAll({
      where: {
        user_id: userId,
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
}
