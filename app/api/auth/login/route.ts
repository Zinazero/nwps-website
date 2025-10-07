import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { findUserByUsername } from '@/lib/users.repository';
import { signToken } from '@/lib/jwt';

export async function POST(req: NextRequest) {
	const { username, password } = await req.json();
	const user = await findUserByUsername(username);
	if (!user)
		return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

	const match = await bcrypt.compare(password, user.password_hash);
	if (!match)
		return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

	const token = signToken({
		userId: user.id,
		username: user.username,
		isSu: user.is_su,
	});

	const res = NextResponse.json({ username: user.username, isSu: user.is_su });
	res.cookies.set('sessionToken', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		maxAge: 60 * 60, // 1 hour
	});
	return res;
}
