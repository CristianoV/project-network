import { Request, Response } from 'express';
import SearchService from '../services/search.service';
import ISearchController from '../interface/IController/ISearchController';

export default class SearchController implements ISearchController {
  constructor(private searchService: SearchService) {}

  public async search(req: Request, res: Response) {
    const { name } = req.params as { name: string };

    const search = await this.searchService.getUserAndComunitiesByName(name);

    return res.status(200).json(search);
  }

  public async getUsersByName(req: Request, res: Response) {
    const { name } = req.params as { name: string };

    const users = await this.searchService.getUsersByName(name);

    return res.status(200).json(users);
  }

  public async getCommunitiesByName(req: Request, res: Response) {
    const { name } = req.params as { name: string };

    const comunities = await this.searchService.getComunitiesByName(name);

    return res.status(200).json(comunities);
  }
}