import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db';
import { signToken, verifyToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
	console.log(req.body);
	const { username, password } = req.body;

	try {
		const hashed = await bcrypt.hash(password, 10);
		const result = await pool.query(
			'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
			[username, hashed]
		);

		res.json(result.rows[0]);
	} catch (err: any) {
		if (err.code === '23505') {
			return res.status(400).json({ error: 'Username already exists' });
		}
		res.status(500).json({ error: 'Server error' });
	}
};

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	try {
		const result = await pool.query('SELECT * FROM users WHERE username = $1', [
			username,
		]);
		if (result.rows.length === 0)
			return res.status(401).json({ error: 'Invalid credentials' });

		const user = result.rows[0];
		const match = await bcrypt.compare(password, user.password_hash);
		if (!match) return res.status(401).json({ error: 'Invalid credentials' });

		const token = signToken({ userId: user.id });

		res
			.cookie('sessionToken', token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'lax', // or 'strict'
				maxAge: 60 * 60 * 1000, // 1 hour
			})
			.json({ username: user.username });
	} catch {
		res.status(500).json({ error: 'Server error' });
	}
};

export const checkAuth = (req: Request, res: Response) => {
	const token = req.cookies.sessionToken;
	if (!token) return res.status(401).json({ authenticated: false });

	const decoded = verifyToken(token);
	if (!decoded) return res.status(401).json({ authenticated: false });

	res.json({ authenticated: true, userId: decoded.userId });
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('sessionToken').json({ message: 'Logged out' });
}
