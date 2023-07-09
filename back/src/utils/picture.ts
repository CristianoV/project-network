import { Request, Router } from 'express';
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');
import dotenv = require('dotenv');
dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

export const uploadAWS = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  storage: multerS3({
    s3: s3,
    bucket: 'bucket-orkut',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req: Request, foto: Express.Multer.File, cb: any) => {
      cb(null, Date.now() + path.extname(foto.originalname));
    },
  }),
});

export const uploadLocal = multer.diskStorage({
  destination: (
    _req: Request,
    file: any,
    cb: (arg0: null, arg1: any) => void
  ) => {
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

const upload = {
  awsStorage: multer(uploadAWS),
  localStorage: multer({ storage: uploadLocal }),
};

export default upload[
  process.env.STORAGE_TYPE === 'aws' ? 'awsStorage' : 'localStorage'
];
