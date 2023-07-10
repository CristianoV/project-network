import PostsService from '../services/post.service';
import { Request, Response } from 'express';

export default class PostController {
  constructor(private postService: PostsService) {}

  public async createPost(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const file = req.file as unknown as {
      location: string;
      filename: string;
    };
    const { text } = req.body as {
      text: string;
    };

    const post = await this.postService.createPost({
      image: process.env.STORAGE_TYPE === 'aws' ? (file ? file.location : null) : (file ? process.env.DB_URL + file.filename : null),
      text,
      authorization,
    });

    return res.status(201).json(post);
  }

  public async updatePost(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const file = req.file as unknown as {
      location: string;
      filename: string;
    };
    const { text } = req.body as {
      text: string;
    };
    const { id } = req.params as { id: string };

    const post = await this.postService.updatePost({
      id: Number(id),
      image: process.env.STORAGE_TYPE === 'aws' ? (file ? file.location : null) : (file ? process.env.DB_URL + file.filename : null),
      text,
      authorization,
    });

    return res.status(200).json(post);
  }

  public async getPosts(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { page, pageSize } = req.query;
    const posts = await this.postService.getPosts({
      authorization,
      page: page ? Number(page) : 1,
      pageSize: pageSize ? Number(pageSize) : 5,
    });

    return res.status(200).json(posts);
  }

  public async deletePost(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { id } = req.params as { id: string };

    await this.postService.deletePost({
      authorization,
      id: Number(id),
    });

    return res.status(204).json();
  }
}
