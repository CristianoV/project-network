import { Request, Response, Router } from 'express';
import LikeModel from '../database/models/likes';
import LikeService from '../services/like.service';
import LikeController from '../controllers/like.controller';

const LikeRoutes: Router = Router();
const likeService = new LikeService(LikeModel);
const likeController = new LikeController(likeService);

LikeRoutes.post('/like', (request: Request, response: Response) =>
  likeController.createLike(request, response)
);

LikeRoutes.get('/like/:post_id', (request: Request, response: Response) =>
  likeController.getLikes(request, response)
);

export default LikeRoutes;
