import fs = require('fs');
import { Request, Response, NextFunction } from 'express';
import JwtSecret from '../utils/JwtService';
import User from '../database/models/user';

class FileMiddleware {
  static async deleteUpdateFile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { authorization } = req.headers as { authorization: string };
    const { id } = JwtSecret.verify(authorization);

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      throw new Error('User not found');
    } else if (req.file) {
      if (user.profile_picture) {
        let parts = user.profile_picture.split('files/');
        let result = parts.slice(-1)[0];

        fs.unlink(`upload/${result}`, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      }

      next();
    } else {
      next();
    }
  }
}

export default FileMiddleware;
