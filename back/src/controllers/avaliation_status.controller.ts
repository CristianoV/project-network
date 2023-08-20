import { Request, Response } from 'express';
import Avaliation_status from '../services/avaliation_status.service';

export default class Avaliation_statusController {
  constructor(private avaliation_status: Avaliation_status) {}

  public async createAvaliation_status(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { avaliation, user_id, type_avaliation } = req.body;

    const avaliation_status =
      await this.avaliation_status.createAvaliation_status({
        avaliation,
        authorization,
        user_id,
        type_avaliation,
      });

    return res.status(201).json(avaliation_status);
  }

  public async getAllAvaliation_status(req: Request, res: Response) {
    const { id } = req.params;
    const avaliation_status =
      await this.avaliation_status.getAllAvaliation_status(id);

    return res.status(200).json(avaliation_status);
  }
}
