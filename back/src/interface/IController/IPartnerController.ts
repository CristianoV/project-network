import { Request, Response } from 'express';

export default interface IPartnerController {
  getPartners(req: Request, res: Response): Promise<Response>;
}
