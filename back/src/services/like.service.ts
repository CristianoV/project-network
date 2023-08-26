import Likes from '../database/models/likes';
import JwtSecret from '../utils/JwtService';

export default class LikesService {
  constructor(private model: typeof Likes) {}

  public async createLike({
    authorization,
    post_id,
    status,
  }: {
    authorization: string;
    post_id: number;
    status: string;
  }) {
    const { id } = JwtSecret.verify(authorization);

    const likeExists = await this.model.findOne({
      where: { user_id: id, post_id },
    });

    if (likeExists && status === null) {
      await this.model.destroy({
        where: { user_id: id, post_id },
      });

      return likeExists;
    }

    if (likeExists) {
      await this.model.update(
        { status },
        {
          where: { user_id: id, post_id },
        }
      );

      return likeExists;
    }

    const like = await this.model.create({
      user_id: id,
      post_id,
      status,
    });

    return like;
  }

  async getLikes({
    authorization,
    post_id,
  }: {
    authorization: string;
    post_id: number;
  }) {
    const { id } = JwtSecret.verify(authorization);

    const likes = await this.model.findAll({
      where: { post_id },
    });

    return likes.reduce((total, like) => {
      if (like.status === 'like') {
        return total + 1;
      } else if (like.status === 'dislike') {
        return total - 1;
      }
      return total;
    }, 0);
  }
}
