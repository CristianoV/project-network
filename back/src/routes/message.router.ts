import { Request, Response, Router } from 'express';
import MessageModel from '../database/models/message';
import MessageService from '../services/message.service';
import MessageController from '../controllers/message.controller';
const multer = require('multer');
import upload from '../utils/picture';

const MessageRoutes: Router = Router();
const messageService = new MessageService(MessageModel);
const messageController = new MessageController(messageService);

MessageRoutes.post(
  '/message',
  multer(upload).single('foto'),
  (request: Request, response: Response) =>
    messageController.createMessage(request, response)
);

MessageRoutes.get('/message', (request: Request, response: Response) =>
  messageController.getMessages(request, response)
);

MessageRoutes.get('/countmessages', (request: Request, response: Response) =>
  messageController.countMessages(request, response)
);

export default MessageRoutes;
