import { Request, Response } from "express";
import UserService from "../services/register.service";

export default class RegisterController {
  constructor(private registerService: UserService) {}

  public async register(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await this.registerService.registerUser({ email, password });

    return res.status(201).json(user);
  }
}