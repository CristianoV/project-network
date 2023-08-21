import { Request, Response } from 'express';
import TestimonyService from '../services/Testimony.service';

export default class TestimonyController {
  constructor(private testimonyService: TestimonyService) {}

  public createTestimony = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { message, to } = req.body;
    const { authorization } = req.headers as { authorization: string };

    const msg = await this.testimonyService.createTestimony({
      message,
      authorization,
      to,
    });

    return res.status(201).json(msg);
  };

  public getTestimonies = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { authorization } = req.headers;
    const { status } = req.params as { status: 'approved' | 'rejected' | 'pending' };
    const { to } = req.query as { to?: number };

    const messages = await this.testimonyService.getTestimonies({
      authorization: authorization as string,
      status,
      to,
    });

    return res.status(200).json(messages);
  };

  public aceptTestimony = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { status } = req.body;

    const msg = await this.testimonyService.aceptTestimony({
      id: Number(id),
      authorization: authorization as string,
      status,
    });

    return res.status(200).json(msg);
  };
}
