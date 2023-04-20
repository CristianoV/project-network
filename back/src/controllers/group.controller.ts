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
    const { name, description } = req.body;
    const { authorization } = req.headers;

    const group = await this.service.createGroup(
      name,
      description,
      authorization as string
    );

    return res.status(201).json(group);
  }

  public async deleteGroup(req: Request, res: Response) {
    const { id } = req.params;

    await this.service.deleteGroup(Number(id));

    return res.status(200).json({ message: 'Group deleted' });
  }
}
