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

  public async getFriendRequests(req: Request, res: Response) {
    const { id } = req.params;
    const friendRequests = await this.friendshipService.getFriendsByUserId(
      Number(id)
    );

    return res.status(200).json(friendRequests);
  }

  public async addFriend(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { friendId } = req.body;
    const friendship = await this.friendshipService.addFriend(
      authorization,
      friendId
    );

    return res.status(201).json(friendship);
  }

  public async deleteFriend(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { friendId } = req.body;

    const friendship = await this.friendshipService.deleteFriend(
      authorization,
      friendId
    );

    return res.status(200).json(friendship);
  }

  public async getFriendRequestsByUserId(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };

    const friendRequests =
      await this.friendshipService.getFriendRequestsByUserId(authorization);

    return res.status(200).json(friendRequests);
  }

  public async respondToFriendRequest(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { friendId, status, requestId } = req.body;

    const friendship = await this.friendshipService.respondToFriendRequest(
      authorization,
      friendId,
      status,
      requestId
    );

    return res.status(200).json(friendship);
  }

  public async isFriend(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { id } = req.params;
    
    const isFriend = await this.friendshipService.isFriend(
      authorization,
      Number(id)
    );

    return res.status(200).json(isFriend);
  }
}
