import Message from '../database/models/message';
import JwtSecret from '../utils/JwtService';
import User from '../database/models/user';

export default class MessageService {
  constructor(private model: typeof Message) {}

  public async createMessage({
    message,
    authorization,
    to,
  }: {
    message: string;
    authorization: string;
    to: number;
  }) {
    const { id } = JwtSecret.verify(authorization);
    
    const msg = await this.model.create({
      message,
      from: id,
      to,
    });

    return msg;
  }

  public async getMessages({
    authorization,
    take = 5,
    page = 1,
    to
  }: {
    authorization: string;
    take?: number;
    page?: number;
    to?: number;
  }) {
    const { id } = JwtSecret.verify(authorization);

    const messages = await this.model.findAll({
      where: {
        to: to || id,
      },
      include: [
        {
          all: true,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
      order: [['created_at', 'DESC']],
      limit: take,
      offset: (page - 1) * take,
    });

    const total = await this.model.count({
      where: {
        to: to || id,
      },
    });

    return {
      messages,
      page,
      totalPage: Math.ceil(total / take),
      totalComments: total,
    };
  }

  public async countMessages({ authorization, to }: { authorization: string, to?: number }) {
    const { id } = JwtSecret.verify(authorization);

    const total = await this.model.count({
      where: {
        to: to || id,
      },
    });

    return total;
  }
}
