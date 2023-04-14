import { Request, Response } from 'express';

export default interface IFriendshipController {
  getFriends(req: Request, res: Response): Promise<Response>;
  getFriendRequests(req: Request, res: Response): Promise<Response>;
  addFriend(req: Request, res: Response): Promise<Response>;
  deleteFriend(req: Request, res: Response): Promise<Response>;
}
