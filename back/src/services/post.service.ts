import JwtSecret from '../utils/JwtService';
import Post from '../database/models/posts';
import Friends from '../database/models/friends';
import { Op } from 'sequelize';

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

  public async getPosts({
    authorization,
    page,
    pageSize,
  }: {
    authorization: string;
    page: number;
    pageSize: number;
  }) {
    const { id } = JwtSecret.verify(authorization);
  
    const friends = await Friends.findAll({
      where: {
        [Op.or]: [{ user_id_1: id }, { user_id_2: id }],
        status: 'accepted',
      },
    });
  
    const friendIds = friends.flatMap((item) => {
      if (item.user_id_1 === id) {
        return item.user_id_2;
      } else {
        return item.user_id_1;
      }
    }) as number[];
  
    friendIds.push(Number(id));
  
    const posts = await this.model.findAll({
      order: [['createdAt', 'DESC']],
      where: {
        user_id: friendIds,
      },
      include: [
        {
          all: true,
        },
      ],
    });
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const result = posts.slice(startIndex, endIndex);
  
    return result;
  }
  
}
