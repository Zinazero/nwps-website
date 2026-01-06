import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../config/env';
import { UserToken } from '../types';

const JWT_SECRET = env.JWT_SECRET;

export const signToken = (payload: UserToken) => jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string): (JwtPayload & UserToken) | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as JwtPayload & UserToken;
  } catch {
    return null;
  }
};
