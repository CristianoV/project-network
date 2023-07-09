import { Request, Response, Router } from 'express';
import GroupModel from '../database/models/groups';
import PartnersModel from '../database/models/partners';
import GroupsService from '../services/groups.service';
import GroupsController from '../controllers/group.controller';
import FileMiddleware from '../middleware/File.middleware';
import upload from '../utils/picture';
const multer = require('multer');

const GroupRoutes: Router = Router();
const groupsService = new GroupsService(GroupModel, PartnersModel);
const groupsController = new GroupsController(groupsService);

GroupRoutes.get('/groups/:id', (request: Request, response: Response) =>
  groupsController.getGroupsByUserId(request, response)
);

GroupRoutes.post(
  '/groups',
  multer(upload).single('foto'),
  FileMiddleware.deleteUpdateFile,
  (request: Request, response: Response) =>
    groupsController.createGroup(request, response)
);

GroupRoutes.delete('/groups/:id', (request: Request, response: Response) =>
  groupsController.deleteGroup(request, response)
);

export default GroupRoutes;
