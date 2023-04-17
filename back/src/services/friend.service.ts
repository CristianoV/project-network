import JwtSecret from '../utils/JwtService';
import Friend from '../database/models/friends';
import { Op } from 'sequelize';
import User from '../database/models/user';
import { IFriendshipService } from '../interface/IService/IFriendshipService';

export default class FriendshipService implements IFriendshipService {
  constructor(private model: typeof Friend) {}

  public async getFriends(authorization: string) {
    const { id } = await JwtSecret.verify(authorization);
    const friends = await this.model.findAll({
      where: {
        [Op.or]: [{ user_id_1: id }, { user_id_2: id }],
        status: 'accepted',
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

  public async getFriendsByUserId(id: number) {
    const friends = await this.model.findAll({
      where: {
        [Op.or]: [{ user_id_1: id }, { user_id_2: id }],
        status: 'accepted',
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

    if (id === friendId) {
      throw new Error('You cannot add yourself as a friend');
    }

    const verifyFriend = await this.model.findOne({
      where: {
        [Op.or]: [
          { user_id_1: id, user_id_2: friendId },
          { user_id_1: friendId, user_id_2: id },
        ],
        [Op.or]: [{ status: 'accepted' }, { status: 'pending' }],
      },
    });

    if (verifyFriend) {
      return 'Friend already added';
    }

    await this.model.create({
      user_id_1: id,
      user_id_2: friendId,
      status: 'pending',
    });

    return 'Friend added';
  }

  public async deleteFriend(authorization: string, friendId: number) {
    const { id } = await JwtSecret.verify(authorization);

    const friend = await this.model.destroy({
      where: {
        [Op.or]: [
          { user_id_1: id, user_id_2: friendId },
          { user_id_1: friendId, user_id_2: id },
        ],
      },
    });

    return 'Friend deleted';
  }

  public async getFriendRequestsByUserId(authorization: string) {
    const { id } = await JwtSecret.verify(authorization);

    const friends = await this.model.findAll({
      where: {
        user_id_2: id,
        status: 'pending',
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

  public async respondToFriendRequest(
    authorization: string,
    friendId: number,
    status: string,
    requestId: number
  ) {
    const { id } = await JwtSecret.verify(authorization);

    await this.model.update(
      { status },
      {
        where: {
          id: requestId,
          [Op.or]: [
            { user_id_1: id, user_id_2: friendId },
            { user_id_1: friendId, user_id_2: id },
          ],
        },
      }
    );

    return 'Friend request responded';
  }

  public async isFriend(authorization: string, friendId: number) {
    const { id } = await JwtSecret.verify(authorization);

    const friend = await this.model.findOne({
      where: {
        [Op.or]: [
          { user_id_1: id, user_id_2: friendId },
          { user_id_1: friendId, user_id_2: id },
        ],
      },
      order: [['id', 'DESC']],
      raw: true,
    });

    console.log(friend);

    if (friend) {
      return {
        status: friend.status,
      };
    } else if (id === friendId) {
      return {
        status: 'self',
      };
    } else {
      return {
        status: 'not friends',
      };
    }
  }
}
