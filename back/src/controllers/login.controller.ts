import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import ILoginController from '../interface/IController/ILoginController';

export default class LoginController implements ILoginController {
  constructor(private registerService: LoginService) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.registerService.login({ email, password });

    return res.status(202).json(user);
  }
}
