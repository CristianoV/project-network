import LikesService from '../services/like.service';
import { Request, Response } from 'express';

export default class LikesController {
  constructor(private service: LikesService) {}

  public createLike = async (req: Request, res: Response) => {
    const { authorization } = req.headers as { authorization: string };
    const { post_id, status } = req.body;

    const like = await this.service.createLike({
      authorization,
      post_id,
      status,
    });

    return res.json(like);
  };

  public getLikes = async (req: Request, res: Response) => {
    const { authorization } = req.headers as { authorization: string };
    const { post_id } = req.params;

    const likes = await this.service.getLikes({
      authorization,
      post_id: Number(post_id),
    });

    return res.json(likes);
  };
}