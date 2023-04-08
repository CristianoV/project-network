import { Request, Response, Router } from 'express';
import UserModel from '../database/models/user';
import LoginService from '../services/user.service';
import LoginController from '../controllers/user.controller';

const LoginRoutes: Router = Router();
const loginService = new LoginService(UserModel);
const loginController = new LoginController(loginService);

LoginRoutes.get('/user', (request: Request, response: Response) =>
  loginController.getUser(request, response)
);

export default LoginRoutes;