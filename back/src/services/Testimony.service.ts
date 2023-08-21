import Testimony from '../database/models/Testimony';
import JwtSecret from '../utils/JwtService';

export default class TestimonyService {
  constructor(private model: typeof Testimony) {}

  public async createTestimony({
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

  public async getTestimonies({
    authorization,
    status,
    to,
  }: {
    authorization: string;
    status: 'approved' | 'rejected' | 'pending';
    to?: number;
  }) {
    const { id } = JwtSecret.verify(authorization);

    const messages = await this.model.findAll({
      where: {
        to: to || id,
        status,
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
    });

    return {
      messages,
      total: messages.length,
    };
  }

  public async aceptTestimony({
    authorization,
    id,
    status,
  }: {
    authorization: string;
    id: number;
    status: 'approved' | 'rejected';
  }) {
    const { id: to } = JwtSecret.verify(authorization);

    const msg = await this.model.findOne({
      where: {
        id,
        to,
      },
    });

    if (!msg) {
      throw new Error('Testimony not found');
    }

    await msg.update({
      status,
    });

    return msg;
  }
}
