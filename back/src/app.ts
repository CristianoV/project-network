import express = require('express');
import cors = require('cors');
import 'express-async-errors';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.get('/', (req, res) => res.json({ status: 'OK' }));

    this.app.use(
      (
        err: Error,
        _req: express.Request,
        res: express.Response,
        next: express.NextFunction
      ) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }
        next();
      }
    );
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

export const { app } = new App();
