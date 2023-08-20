import avaliation_status from '../database/models/avaliation_status';
import JwtSecret from '../utils/JwtService';
import FriendshipService from './friend.service';

enum TypeAvaliation {
  reliable = 'reliable',
  Cool = 'Cool',
  sexy = 'sexy',
}

export default class Avaliation_statusService {
  constructor(
    private model: typeof avaliation_status,
    private friendshipService: FriendshipService
  ) {}

  public async createAvaliation_status({
    avaliation,
    authorization,
    user_id,
    type_avaliation,
  }: {
    avaliation: string;
    authorization: string;
    user_id: number;
    type_avaliation: TypeAvaliation;
  }) {
    const { id } = JwtSecret.verify(authorization);
    const isFriend = await this.friendshipService.isFriend(
      authorization,
      user_id
    );

    if (isFriend.status != 'accepted') {
      throw new Error('Você não pode avaliar alguém que não é seu amigo');
    }

    if (id === Number(user_id)) {
      throw new Error('Não é possível avaliar a si mesmo');
    }

    const avaliation_status = await this.model.findOne({
      where: {
        user_id,
        evaluator_id: id,
        type_avaliation: type_avaliation,
      },
    });

    if (avaliation_status) {
      avaliation_status.avaliation = avaliation;
      await avaliation_status.save();
      return;
    }

    await this.model.create({
      avaliation,
      user_id,
      evaluator_id: id,
      type_avaliation,
    });
  }

  public async getAllAvaliation_status(id: string) {
    const avaliation_status = await this.model.findAll({
      where: {
        user_id: id,
      },
    });

    let sexy = 0;
    let cool = 0;
    let reliable = 0;

    let sexyCount = 0;
    let coolCount = 0;
    let reliableCount = 0;

    avaliation_status.forEach((avaliation) => {
      if (avaliation.type_avaliation === 'sexy') {
        sexyCount = sexyCount + Number(avaliation.avaliation);
        sexy++;
      }
      if (avaliation.type_avaliation === 'Cool') {
        coolCount = coolCount + Number(avaliation.avaliation);
        cool++;
      }
      if (avaliation.type_avaliation === 'reliable') {
        reliableCount = reliableCount + Number(avaliation.avaliation);
        reliable++;
      }
    });

    return {
      sexy: Math.round(sexyCount / sexy) | 0,
      cool: Math.round(coolCount / cool) | 0,
      reliable: Math.round(reliableCount / reliable) | 0,
    };
  }
}
