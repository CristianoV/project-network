import { Request, Response, Router } from 'express';
import Avaliation_statusModel from '../database/models/avaliation_status';
import Avaliation_statusService from '../services/avaliation_status.service';
import FriendshipService from '../services/friend.service';
import FriendModel from '../database/models/friends';
import Avaliation_statusController from '../controllers/avaliation_status.controller';

const Avaliation_statusRoutes: Router = Router();
const avaliation_statusService = new Avaliation_statusService(Avaliation_statusModel, new FriendshipService(FriendModel));
const avaliation_statusController = new Avaliation_statusController(avaliation_statusService);

Avaliation_statusRoutes.post('/avaliation_status', (request: Request, response: Response) =>
  avaliation_statusController.createAvaliation_status(request, response)
);

Avaliation_statusRoutes.get('/avaliation_status/:id', (request: Request, response: Response) =>
  avaliation_statusController.getAllAvaliation_status(request, response)
);

export default Avaliation_statusRoutes;