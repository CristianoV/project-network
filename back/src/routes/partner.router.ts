import { Request, Response, Router } from 'express';
import FriendController from '../controllers/partner.controller';
import FriendService from '../services/partner.service';
import FriendModel from '../database/models/partners';

const FriendRoutes: Router = Router();
const friendService = new FriendService(FriendModel);
const friendController = new FriendController(friendService);

FriendRoutes.get('/partner', (request: Request, response: Response) =>
  friendController.getPartners(request, response)
);

FriendRoutes.get('/partner/:id', (request: Request, response: Response) =>
  friendController.getPartnersByUserId(request, response)
);

FriendRoutes.get('/partner/group/:id', (request: Request, response: Response) =>
  friendController.getPartnerByGroupId(request, response)
);

export default FriendRoutes;
