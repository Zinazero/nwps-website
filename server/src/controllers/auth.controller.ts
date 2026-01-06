import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import env from '../config/env';
import {
  checkRegistrationToken,
  createRegistrationToken,
  useRegistrationToken,
} from '../repositories/registrationTokens.repository';
import { createUser, findUserByUsername } from '../repositories/users.repository';
import { sendRegistrationEmail } from '../services/email.services';
import { DbError, UserToken } from '../types';
import { signToken, verifyToken } from '../utils/jwt';

export const checkAuth = (req: Request, res: Response) => {
  const token = req.cookies.sessionToken;
  if (!token) return res.status(401).json({ authenticated: false });

  const decoded: UserToken | null = verifyToken(token);
  if (!decoded) return res.status(401).json({ authenticated: false });

  res.json({
    authenticated: true,
    userId: decoded.userId,
    username: decoded.username,
    roleLevel: decoded.roleLevel,
  });
};

export const validateRegistrationToken = async (req: Request, res: Response) => {
  const { token } = req.query;
  if (!token || Array.isArray(token) || typeof token !== 'string') {
    return res.status(400).json({ error: 'Invalid request query' });
  }

  const reg = await checkRegistrationToken(token);

  if (!reg.valid) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  res.json(reg);
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
      roleLevel: user.level,
    });

    res
      .cookie('sessionToken', token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000, // 1 hour
      })
      .json({ username: user.username, roleLevel: user.level });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const logout = (_req: Request, res: Response) => {
  res.clearCookie('sessionToken').json({ message: 'Logged out' });
};

export const sendRegistrationInvite = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    createRegistrationToken(email, token, expiresAt);

    const link = `${env.CLIENT_BASE}/register?token=${token}`;

    await sendRegistrationEmail(email, link);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { token, username, password } = req.body;

  try {
    const reg = await checkRegistrationToken(token);
    if (!reg.valid) {
      console.error('Invalid registration token', token);
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await createUser(username, hashed);
    await useRegistrationToken(token);

    const user = await findUserByUsername(username);

    const jwt = signToken({
      userId: user.id,
      username: user.username,
      roleLevel: user.level,
    });

    res
      .cookie('sessionToken', jwt, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 1000,
      })
      .json({ username: user.username, roleLevel: user.level });
  } catch (err: unknown) {
    const error = err as DbError;
    if (error.code === '23505') {
      console.error('Username already exists.');
      return res.status(400).json({ error: 'Username already exists.' });
    }
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
};
