import { Request, Response, Router } from 'express';
import UserModel from '../database/models/user';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';

const LoginRoutes: Router = Router();
const loginService = new LoginService(UserModel);
const loginController = new LoginController(loginService);

LoginRoutes.post('/login', (request: Request, response: Response) =>
  loginController.login(request, response)
);

export default LoginRoutes;
