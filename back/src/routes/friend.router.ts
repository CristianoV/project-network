import { Request, Response, Router } from 'express';
import FriendController from '../controllers/friend.controller';
import FriendService from '../services/friend.service';
import FriendModel from '../database/models/friends';

const FriendRoutes: Router = Router();
const friendService = new FriendService(FriendModel);
const friendController = new FriendController(friendService);

FriendRoutes.get('/friends', (request: Request, response: Response) =>
  friendController.getFriends(request, response)
);

FriendRoutes.get('/friends/:id', (request: Request, response: Response) =>
  friendController.getFriendRequests(request, response)
);

FriendRoutes.post('/friends', (request: Request, response: Response) =>
  friendController.addFriend(request, response)
);

FriendRoutes.delete('/friends', (request: Request, response: Response) =>
  friendController.deleteFriend(request, response)
);

FriendRoutes.get('/friend/requests', (request: Request, response: Response) =>
  friendController.getFriendRequestsByUserId(request, response)
);

FriendRoutes.post('/friend/requests', (request: Request, response: Response) =>
  friendController.respondToFriendRequest(request, response)
);

FriendRoutes.get('/friend/status/:id', (request: Request, response: Response) =>
  friendController.isFriend(request, response)
);

export default FriendRoutes;
