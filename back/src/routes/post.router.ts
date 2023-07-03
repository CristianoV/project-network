import { Request, Response, Router } from 'express';
import PostModel from '../database/models/posts';
import PostService from '../services/post.service';
import PostController from '../controllers/post.controller';
import upload from '../utils/picture';

const PostRoutes: Router = Router();
const postService = new PostService(PostModel);
const loginController = new PostController(postService);

PostRoutes.post(
  '/post',
  upload.single('foto'),
  (request: Request, response: Response) =>
    loginController.createPost(request, response)
);

PostRoutes.get('/post', (request: Request, response: Response) =>
  loginController.getPosts(request, response)
);

export default PostRoutes;
