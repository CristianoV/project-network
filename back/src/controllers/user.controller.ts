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

  public async getUserById(req: Request, res: Response) {
    const { id } = req.params;

    const user = await this.userService.getUserById(Number(id));

    return res.status(200).json(user);
  }
}
