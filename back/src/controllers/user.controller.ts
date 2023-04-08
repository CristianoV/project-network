import { Request, Response } from 'express';
import UserService from '../services/user.service';
import IUserController from '../interface/IController/IUserController';

export default class UserController implements IUserController {
  constructor(private userService: UserService) {}

  public async getUser(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };

    const user = await this.userService.getUser(authorization);

    return res.status(200).json(user);
  }
}
