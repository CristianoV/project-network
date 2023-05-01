import { Request, Response, Router } from 'express';
import PartnersModelController from '../controllers/partner.controller';
import PartnersModelService from '../services/partner.service';
import PartnersModelModel from '../database/models/partners';

const PartnersRoutes: Router = Router();
const partnerService = new PartnersModelService(PartnersModelModel);
const partnerController = new PartnersModelController(partnerService);

PartnersRoutes.get('/partner', (request: Request, response: Response) =>
  partnerController.getPartners(request, response)
);

PartnersRoutes.get('/partner/:id', (request: Request, response: Response) =>
  partnerController.getPartnersByUserId(request, response)
);

PartnersRoutes.get(
  '/partner/group/:id',
  (request: Request, response: Response) =>
    partnerController.getPartnerByGroupId(request, response)
);

PartnersRoutes.post('/partner', (request: Request, response: Response) =>
  partnerController.createPartner(request, response)
);

PartnersRoutes.get(
  '/partner/is/:groupId',
  (request: Request, response: Response) =>
    partnerController.isPartner(request, response)
);

export default PartnersRoutes;
