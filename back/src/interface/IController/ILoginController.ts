import { Request, Response } from "express";

export default interface ILoginController {
  login(req: Request, res: Response): Promise<Response>;
}