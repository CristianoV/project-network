import JwtSecret from '../utils/JwtService';
import Friend from '../database/models/friends';
import { Op } from 'sequelize';
import User from '../database/models/user';
import { IFriendshipService } from '../interface/IService/IFriendshipService';

export default class FriendshipService implements IFriendshipService {
  constructor(private model: typeof Friend) {}

  public async getFriends(authorization: string) {
    const { id: userId } = await JwtSecret.verify(authorization);
    const friends = await this.model.findAll({
      where: {
        [Op.or]: [{ user_id_1: userId }, { user_id_2: userId }],
      },
      include: [
        {
          model: User,
          as: 'user_1',
          attributes: { exclude: ['password'] },
        },
        {
          model: User,
          as: 'user_2',
          attributes: { exclude: ['password'] },
        },
      ],
    });

    const result = friends.map((friend) => {
      const friendUser =
        friend.user_id_1 === userId ? friend.user_2 : friend.user_1;
      return {
        id: friend.id,
        friend: friendUser,
      };
    });

    return result;
  }

  public async getFriendsByUserId(id: number) {
    const friends = await this.model.findAll({
      where: {
        [Op.or]: [{ user_id_1: id }, { user_id_2: id }],
      },
      include: [
        {
          model: User,
          as: 'user_1',
          attributes: { exclude: ['password'] },
        },
        {
          model: User,
          as: 'user_2',
          attributes: { exclude: ['password'] },
        },
      ],
    });

    const result = friends.map((friend) => {
      const friendUser =
        friend.user_id_1 === id ? friend.user_2 : friend.user_1;
      return {
        id: friend.id,
        friend: friendUser,
      };
    });

    return result;
  }

  public async addFriend(authorization: string, friendId: number) {
    const { id } = await JwtSecret.verify(authorization);

    const friend = await this.model.create({
      user_id_1: id,
      user_id_2: friendId,
    });

    return 'Friend added';
  }

  public async deleteFriend(authorization: string, friendId: number) {
    const { id } = await JwtSecret.verify(authorization);

    const friend = await this.model.destroy({
      where: {
        user_id_1: id,
        user_id_2: friendId,
      },
    });

    return 'Friend deleted';
  }
}
