import { Request, Response } from 'express';
import PartnerService from '../services/partner.service';
import IPartnerController from '../interface/IController/IPartnerController';

export default class PartnerController implements IPartnerController {
  constructor(private partnerService: PartnerService) {}

  public async getPartners(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const partners = await this.partnerService.getPartners(authorization);

    return res.status(200).json(partners);
  }
}
