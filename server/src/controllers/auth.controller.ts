import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import env from '../config/env';
import { createUser, findUserByUsername } from '../repositories/users.repository';
import { DbError } from '../types';
import { signToken, verifyToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashed = await bcrypt.hash(password, 10);
    const newUser = await createUser(username, hashed);

    res.json(newUser);
  } catch (err: unknown) {
    const error = err as DbError;
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Username already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await findUserByUsername(username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken({
      userId: user.id,
      username: user.username,
      isSu: user.is_su,
    });

    res
      .cookie('sessionToken', token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({ username: user.username, isSu: user.is_su });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

export const checkAuth = (req: Request, res: Response) => {
  const token = req.cookies.sessionToken;
  if (!token) return res.status(401).json({ authenticated: false });

  const decoded = verifyToken(token);
  if (!decoded) return res.status(401).json({ authenticated: false });

  res.json({
    authenticated: true,
    userId: decoded.userId,
    username: decoded.username,
    isSu: decoded.isSu,
  });
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('sessionToken').json({ message: 'Logged out' });
};
