import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  constructor(private registerService: LoginService) {}

  public async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.registerService.login({ email, password });

    return res.status(202).json(user);
  }
}
