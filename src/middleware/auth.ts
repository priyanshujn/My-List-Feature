
import { Request, Response, NextFunction } from 'express';

export default function auth(req: Request, res: Response, next: NextFunction) {
  req.headers['x-user-id'] = 'user_1';
  next();
}
