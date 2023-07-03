import PostsService from '../services/post.service';
import { Request, Response } from 'express';

export default class PostController {
  constructor(private postService: PostsService) {}

  public async createPost(req: Request, res: Response) {
    const { authorization } = req.headers as { authorization: string };
    const { text } = req.body as {
      text: string;
    };
    console.log('req.file', req.file);

    const image = req.file ? process.env.DB_URL + req.file.filename : null;

    const post = await this.postService.createPost({
      image,
      text,
      authorization,
    });

    return res.status(201).json(post);
  }

  public async getPosts(req: Request, res: Response) {
    const posts = await this.postService.getPosts();

    return res.status(200).json(posts);
  }
}
