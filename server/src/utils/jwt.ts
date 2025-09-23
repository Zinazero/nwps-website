import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

interface UserToken {
	userId: number;
	username: string;
	isManager: boolean;
}

export const signToken = (payload: object) =>
	jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

export const verifyToken = (token: string): (JwtPayload & UserToken) | null => {
	try {
		return jwt.verify(token, JWT_SECRET) as JwtPayload & UserToken;
	} catch {
		return null;
	}
};
