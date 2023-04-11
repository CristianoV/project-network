import { Request, Response } from 'express';
import UserService from '../services/register.service';
import IRegisterController from '../interface/IController/IRegisterController';

export default class RegisterController implements IRegisterController {
  constructor(private registerService: UserService) {}

  public async register(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body;

    const user = await this.registerService.register({
      email,
      password,
      firstName,
      lastName,
    });

    return res.status(201).json(user);
  }
}
