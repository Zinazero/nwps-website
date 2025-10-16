import { deleteProductsCategory } from '@/lib/products.repository';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	const { id } = params;

	const productsId = Number(id);
	await deleteProductsCategory(productsId);
	return NextResponse.json({ success: true });
}
