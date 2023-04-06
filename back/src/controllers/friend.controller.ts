import { Request, Response } from 'express';
import FriendshipService from '../services/friend.service';
import IFriendshipController from '../interface/IController/IFriendshipController';

export default class FriendshipController implements IFriendshipController {
  constructor(private friendshipService: FriendshipService) {}

  public async getFriends(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const friends = await this.friendshipService.getFriends(authorization);

    return res.status(200).json(friends);
  }

  public async addFriend(req: Request, res: Response) {
    const { userId, friendId } = req.body;
    const friendship = await this.friendshipService.addFriend(userId, friendId);

    return res.status(201).json(friendship);
  }

  public async deleteFriend(req: Request, res: Response) {
    const { userId, friendId } = req.body;
    const friendship = await this.friendshipService.deleteFriend(
      userId,
      friendId
    );

    return res.status(200).json(friendship);
  }
}
