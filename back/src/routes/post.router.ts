import { Request, Response, Router } from 'express';
import PostModel from '../database/models/posts';
import PostService from '../services/post.service';
import PostController from '../controllers/post.controller';
const multer = require('multer');
import upload from '../utils/picture';

const PostRoutes: Router = Router();
const postService = new PostService(PostModel);
const loginController = new PostController(postService);

PostRoutes.post(
  '/post',
  multer(upload).single('foto'),
  (request: Request, response: Response) =>
    loginController.createPost(request, response)
);

PostRoutes.put(
  '/post/:id',
  multer(upload).single('foto'),
  (request: Request, response: Response) =>
    loginController.updatePost(request, response)
);

PostRoutes.get('/post', (request: Request, response: Response) =>
  loginController.getPosts(request, response)
);

PostRoutes.get('/post/profile/:id', (request: Request, response: Response) =>
  loginController.getPostsProfile(request, response)
);

PostRoutes.delete('/post/:id', (request: Request, response: Response) =>
  loginController.deletePost(request, response)
);

export default PostRoutes;
