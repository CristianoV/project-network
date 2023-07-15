import { Request, Response, Router } from 'express';
import CommentModel from '../database/models/comment';
import CommentService from '../services/comment.service';
import CommentController from '../controllers/comment.controller';

const CommentRoutes: Router = Router();
const commentService = new CommentService(CommentModel);
const commentController = new CommentController(commentService);

CommentRoutes.post('/comment', (request: Request, response: Response) =>
  commentController.createComment(request, response)
);

CommentRoutes.put('/comment/:id', (request: Request, response: Response) =>
  commentController.updateComment(request, response)
);

CommentRoutes.delete('/comment/:id', (request: Request, response: Response) =>
  commentController.deleteComment(request, response)
);

export default CommentRoutes;
