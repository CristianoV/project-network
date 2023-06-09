import { Request, Response, Router } from 'express';
import UserModel from '../database/models/user';
import LoginService from '../services/user.service';
import LoginController from '../controllers/user.controller';
import FileMiddleware from '../middleware/File.middleware';
import upload from '../utils/picture';
const multer = require('multer');

const LoginRoutes: Router = Router();
const loginService = new LoginService(UserModel);
const loginController = new LoginController(loginService);

LoginRoutes.get('/user', (request: Request, response: Response) =>
  loginController.getUser(request, response)
);

LoginRoutes.patch('/user/phrase', (request: Request, response: Response) =>
  loginController.updatePhrase(request, response)
);

LoginRoutes.put('/user/profile', (request: Request, response: Response) =>
  loginController.updateProfile(request, response)
);

LoginRoutes.get('/user/:id', (request: Request, response: Response) =>
  loginController.getUserById(request, response)
);

LoginRoutes.patch(
  '/user/image',
  multer(upload).single('foto'),
  (request: Request, response: Response) =>
    loginController.updateImage(request, response)
);

export default LoginRoutes;
