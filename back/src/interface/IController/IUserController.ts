import { Request, Response } from "express";

export default interface IUserController {
  getUser(req: Request, res: Response): Promise<Response>;
}