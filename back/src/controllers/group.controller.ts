import { Request, Response } from 'express';
import GroupsService from '../services/groups.service';
import { IGroupsController } from '../interface/IController/IGroupsController';

export default class GroupsController implements IGroupsController {
  constructor(private service: GroupsService) {}

  public async getGroupsByUserId(req: Request, res: Response) {
    const { id } = req.params;

    const groups = await this.service.getGroupsByUserId(Number(id));

    return res.status(200).json(groups);
  }

  public async createGroup(req: Request, res: Response) {
    const { name, description, language, category, type, country } = req.body;
    const { authorization } = req.headers as { authorization: string };
    const file = req.file as unknown as {
      location: string;
      filename: string;
    };

    const group = await this.service.createGroup({
      name,
      description,
      language,
      category,
      type,
      country,
      profile_picture:
        process.env.STORAGE_TYPE === 'aws'
          ? file
            ? file.location
            : null
          : file
          ? process.env.DB_URL + file.filename
          : null,
      authorization,
    });

    return res.status(201).json(group);
  }

  public async deleteGroup(req: Request, res: Response) {
    const { id } = req.params;
    const { authorization } = req.headers as { authorization: string };

    await this.service.deleteGroup(Number(id), authorization);

    return res.status(200).json({ message: 'Group deleted' });
  }

  public async updateImage(req: Request, res: Response) {
    const { id } = req.params;
    const file = req.file as unknown as {
      location: string;
      filename: string;
    };
    const { authorization } = req.headers as { authorization: string };

    const group = await this.service.updateImage({
      id: Number(id),
      profile_picture: process.env.STORAGE_TYPE === 'aws' ? (file ? file.location : null) : (file ? process.env.DB_URL + file.filename : null),
      authorization,
    });
    
    return res.status(200).json(group);
  }
}
