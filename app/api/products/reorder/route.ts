import { NextResponse } from 'next/server';
import { reorderProducts } from '@/lib/products.repository';
import { ProductOrder } from '@/lib/types';

export async function POST(request: Request) {
	try {
		const updates = await request.json();

		await Promise.all(
			updates.map(({ id, sort_order }: ProductOrder) =>
				reorderProducts({ id, sort_order })
			)
		);

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error('Error reordering products:', err);
		return NextResponse.json(
			{ error: 'Failed to reorder products' },
			{ status: 500 }
		);
	}
}
