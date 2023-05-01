import { Request, Response } from 'express';

export interface IGroupsController {
  getGroupsByUserId(req: Request, res: Response): Promise<Response>;
  createGroup(req: Request, res: Response): Promise<Response>;
  deleteGroup(req: Request, res: Response): Promise<Response>;
}
