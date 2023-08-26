import JwtSecret from '../utils/JwtService';
import Post from '../database/models/posts';
import Friends from '../database/models/friends';
import Comment from '../database/models/comment';
import { Op } from 'sequelize';

export interface RootObject {
  toJSON(): any;
  id: number;
  text: string;
  image?: any;
  user_id: number;
  created_at: string;
  updated_at: string;
  user: User;
  comments: any[];
  likes: Like[];
}

export interface Like {
  id: number;
  user_id: number;
  post_id: number;
  status: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  bio: string;
  profile_picture?: any;
  birthday: string;
  relationship: string;
  country: string;
  phrase?: any;
  sex: string;
  cep: string;
  state: string;
  language: string;
}

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

  public async updatePost({
    id,
    image,
    text,
    authorization,
  }: {
    image: string | null;
    text: string | null;
    authorization: string;
    id: number;
  }) {
    const { id: userId } = JwtSecret.verify(authorization);

    const post = await this.model.findOne({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    if (image) post.image = image;
    if (text) post.text = text;

    await post.save();

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
    const { id } = JwtSecret.verify(authorization) as { id: number };
  
    const friends = await Friends.findAll({
      where: {
        [Op.or]: [{ user_id_1: id }, { user_id_2: id }],
        status: 'accepted',
      },
    });
  
    const friendIds = friends.flatMap((item) =>
      item.user_id_1 === id ? item.user_id_2 : item.user_id_1
    );
  
    friendIds.push(Number(id));
  
    const posts = await this.getPostsWithDetails(friendIds);
  
    const countLikeForPost = await this.getCountsForLikes(posts);
    const youLiked = await this.getUserLikes(posts, id);
  
    const postsWithCount = this.combinePostDetails(posts, countLikeForPost, youLiked);
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const result = postsWithCount.slice(startIndex, endIndex);
  
    return result;
  }
  
  private async getPostsWithDetails(friendIds: number[]) {
    return this.model.findAll({
      order: [['created_at', 'DESC']],
      where: {
        user_id: friendIds,
      },
      include: [
        {
          all: true,
          nested: true,
        },
      ],
    }) as unknown as RootObject[];
  }
  
  private async getCountsForLikes(posts: RootObject[]) {
    return Promise.all(
      posts.map(async (post) => {
        const likes = await post.likes;
        return likes.reduce((total, like) => {
            if (like.status === 'like') {
              return total + 1;
            } else if (like.status === 'dislike') {
              return total - 1;
            }
          return total;
        }, 0);
      })
    );
  }
  
  private async getUserLikes(posts: RootObject[], userId: number) {
    return Promise.all(
      posts.map(async (post) => {
        const likes = await post.likes;
        const userLike = likes.find((like) => like.user_id === userId);
        return userLike?.status;
      })
    );
  }
  
  private combinePostDetails(
    posts: RootObject[],
    likeCounts: number[],
    userLikes: (string | undefined)[]
  ) {
    return posts.map((post, index) => ({
      ...post.toJSON(),
      countLike: likeCounts[index],
      youLiked: userLikes[index] || null,
    }));
  }
  

  public async getPostsProfile({
    authorization,
    page,
    pageSize,
    id,
  }: {
    authorization: string;
    page: number;
    pageSize: number;
    id: number;
  }) {
    const { id: userId } = JwtSecret.verify(authorization) as { id: number };

    const posts = await this.model.findAll({
      order: [['created_at', 'DESC']],
      where: {
        user_id: id,
      },
      include: [
        {
          all: true,
          nested: true,
        },
      ],
    }) as unknown as RootObject[];

    const countLikeForPost = await this.getCountsForLikes(posts);
    const youLiked = await this.getUserLikes(posts, userId);
  
    const postsWithCount = this.combinePostDetails(posts, countLikeForPost, youLiked);
  
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    const result = postsWithCount.slice(startIndex, endIndex);
  
    return result;
  }

  public async deletePost({
    authorization,
    id,
  }: {
    authorization: string;
    id: number;
  }) {
    const { id: userId } = JwtSecret.verify(authorization);

    const post = await this.model.findOne({
      where: {
        id,
        user_id: userId,
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    await post.destroy();

    return post;
  }
}
