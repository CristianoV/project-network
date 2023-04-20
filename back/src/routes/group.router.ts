import { Request, Response, Router } from 'express';
import GroupModel from '../database/models/groups';
import GroupsService from '../services/groups.service';
import GroupsController from '../controllers/group.controller';

const GroupRoutes: Router = Router();
const groupsService = new GroupsService(GroupModel);
const groupsController = new GroupsController(groupsService);

GroupRoutes.get('/groups/:id', (request: Request, response: Response) =>
  groupsController.getGroupsByUserId(request, response)
);

GroupRoutes.post('/groups', (request: Request, response: Response) =>
  groupsController.createGroup(request, response)
);

GroupRoutes.delete('/groups/:id', (request: Request, response: Response) =>
  groupsController.deleteGroup(request, response)
);

export default GroupRoutes;