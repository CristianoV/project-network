import { Request, Response } from 'express';
import CommentService from '../services/comment.service';

export default class CommentController {
  constructor(private commentService: CommentService) {}

  public async createComment(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { content, post_id } = req.body as {
      content: string;
      post_id: number;
    };   

    const comment = await this.commentService.createComment({
      content,
      authorization,
      post_id,
    });

    return res.status(201).json(comment);
  }
}
