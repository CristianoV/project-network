import { Request, Response } from 'express';
import MessageService from '../services/message.service';

export default class MessageController {
  constructor(private messageService: MessageService) {}

  public async createMessage(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { message, to } = req.body as {
      message: string;
      to: number;
    };

    const msg = await this.messageService.createMessage({
      message,
      authorization,
      to,
    });

    return res.status(201).json(msg);
  }

  public async getMessages(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { take, page, to } = req.query as unknown as {
      take: number;
      page: number;
      to: number;
    };

    const messages = await this.messageService.getMessages({
      authorization,
      take,
      page,
      to,
    });

    return res.status(200).json(messages);
  }

  public async countMessages(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { to } = req.query as unknown as {
      to: number;
    };

    const total = await this.messageService.countMessages({
      authorization,
      to,
    });

    return res.status(200).json(total);
  }
}
