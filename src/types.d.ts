import { Request } from 'express';
import { User } from '../models/userSchema';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}