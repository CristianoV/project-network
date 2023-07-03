import JwtSecret from '../utils/JwtService';
import Post from '../database/models/posts';

export default class PostsService {
  constructor(private model: typeof Post) {}

  public async createPost({
    image,
    text,
    authorization,
  }: {
    image: string | null;
    text: string;
    authorization: string;
  }) {
    const { id } = JwtSecret.verify(authorization);

    const post = await this.model.create({
      image,
      text,
      user_id: id,
    });

    return post;
  }

  //  public async getPosts() {
  //    const posts = await this.model.findAll({
  //      include: [
  //        {
  //          association: 'user',
  //          attributes: ['name', 'username', 'id'],
  //        },
  //        {
  //         association: 'comments',
  //          attributes: ['text', 'id'],
  //          include: [
  //            {
  //              association: 'user',
  //              attributes: ['name', 'username', 'id'],
  //            },
  //          ],
  //        },
  //      ],
  //    });
  //
  //    return posts;
  //  }

  public async getPosts() {
    const posts = await this.model.findAll({
      order: [['createdAt', 'DESC']],
      include: [
        {
          association: 'user',
        },
      ],
    });

    return posts;
  }
}
