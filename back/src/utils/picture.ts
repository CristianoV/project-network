import { Request, Response, Router } from 'express';
import multer = require('multer');
import path = require('path');

const storage = multer.diskStorage({
  destination: (_req: Request, file: any, cb: (arg0: null, arg1: any) => void) => {
    cb(null, 'upload/');
  },
  filename: (
    req: Request,
    foto: { originalname: any },
    cb: (arg0: null, arg1: any) => void
  ) => {
    cb(null, Date.now() + path.extname(foto.originalname));
  },
});

const upload = multer({ storage });

export default upload;