import { Request, Response, Router } from 'express';
import UserModel from '../database/models/user';
import ComunityModel from '../database/models/groups';
import SearchService from '../services/search.service';
import SearchController from '../controllers/search.controller';

const SearchRoutes: Router = Router();
const searchService = new SearchService(UserModel, ComunityModel);
const searchController = new SearchController(searchService);

SearchRoutes.get('/search/:name', (request: Request, response: Response) =>
  searchController.search(request, response)
);

SearchRoutes.get(
  '/search/users/:name',
  (request: Request, response: Response) =>
    searchController.getUsersByName(request, response)
);

SearchRoutes.get(
  '/search/comunities/:name',
  (request: Request, response: Response) =>
    searchController.getCommunitiesByName(request, response)
);

export default SearchRoutes;
