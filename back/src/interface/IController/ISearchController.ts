import { Request, Response } from 'express';

export default interface ISearchController {
  search(req: Request, res: Response): Promise<Response>;
  getUsersByName(req: Request, res: Response): Promise<Response>;
  getCommunitiesByName(req: Request, res: Response): Promise<Response>;
}
