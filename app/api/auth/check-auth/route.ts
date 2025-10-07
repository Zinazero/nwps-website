import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function GET(req: NextRequest) {
	const token = req.cookies.get('sessionToken')?.value;
	if (!token)
		return NextResponse.json({ authenticated: false }, { status: 401 });

	const decoded = verifyToken(token);
	if (!decoded)
		return NextResponse.json({ authenticated: false }, { status: 401 });

	return NextResponse.json({
		authenticated: true,
		userId: decoded.userId,
		username: decoded.username,
		isSu: decoded.isSu,
	});
}
