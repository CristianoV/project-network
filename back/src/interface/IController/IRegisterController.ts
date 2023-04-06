import { Request, Response } from "express";

export default interface IRegisterController {
  register(req: Request, res: Response): Promise<Response>;
}