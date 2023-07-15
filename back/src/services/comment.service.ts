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

  public async updateComment({
    content,
    authorization,
    id,
  }: {
    content: string;
    authorization: string;
    id: number;
  }) {
    const { id: user_id } = JwtSecret.verify(authorization);

    const comment = await this.model.update(
      { content },
      { where: { id, user_id } }
    );

    return comment;
  }

  public async deleteComment({
    authorization,
    id,
  }: {
    authorization: string;
    id: number;
  }) {
    const { id: user_id } = JwtSecret.verify(authorization);

    const comment = await this.model.destroy({ where: { id, user_id } });

    return comment;
  }
}
