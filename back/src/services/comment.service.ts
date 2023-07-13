import Comment from '../database/models/comment';
import JwtSecret from '../utils/JwtService';

export default class CommentsService {
  constructor(private model: typeof Comment) {}

  public async createComment({
    content,
    authorization,
    post_id,
  }: {
    content: string;
    authorization: string;
    post_id: number;
  }) {
    const { id } = JwtSecret.verify(authorization);

    const comment = await this.model.create({
      content,
      user_id: id,
      post_id,
    });

    return comment;
  }
}
