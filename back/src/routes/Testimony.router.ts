import { Request, Response, Router } from 'express';
import TestimonyModel from '../database/models/Testimony';
import TestimonyService from '../services/Testimony.service';
import TestimonyController from '../controllers/Testimony.controller';

const TestimonyRoutes: Router = Router();
const testimonyService = new TestimonyService(TestimonyModel);
const testimonyController = new TestimonyController(testimonyService);

TestimonyRoutes.post('/testimony', (request: Request, response: Response) =>
  testimonyController.createTestimony(request, response)
);

TestimonyRoutes.get('/testimony/:status', (request: Request, response: Response) =>
  testimonyController.getTestimonies(request, response)
);

TestimonyRoutes.put('/testimony/:id', (request: Request, response: Response) =>
  testimonyController.aceptTestimony(request, response)
);

export default TestimonyRoutes;
