import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { createUser } from '@/lib/users.repository';

export async function POST(req: NextRequest) {
	const { username, password } = await req.json();
	try {
		const hashed = await bcrypt.hash(password, 10);
		const newUser = await createUser(username, hashed);
		return NextResponse.json(newUser);
	} catch (err: any) {
		if (err.code === '23505') {
			return NextResponse.json(
				{ error: 'Username already exists' },
				{ status: 400 }
			);
		}
		return NextResponse.json({ error: 'Server error' }, { status: 500 });
	}
}
