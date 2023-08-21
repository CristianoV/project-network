import cookie from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

export default function login(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('token', req.body.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      path: '/',
    })
  );
  res.statusCode = 200;
  res.json({ success: true });
}