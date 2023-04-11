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

  public async updatePhrase(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { phrase } = req.body as { phrase: string };

    await this.userService.updatePhrase(authorization, phrase);

    return res.status(200).json('Phrase updated');
  }

  public async updateProfile(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };

    await this.userService.updateProfile(authorization, req.body);

    return res.status(200).json('Profile updated');
  }

  public async getUsersByName(req: Request, res: Response) {
    const { name } = req.params as { name: string };

    const users = await this.userService.getUsersByName(name);

    return res.status(200).json(users);
  }
}
