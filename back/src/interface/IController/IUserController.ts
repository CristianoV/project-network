import { Request, Response } from 'express';

export default interface IUserController {
  getUser(req: Request, res: Response): Promise<Response>;
  updatePhrase(req: Request, res: Response): Promise<Response>;
  updateProfile(req: Request, res: Response): Promise<Response>;
}
