import { QueryResult } from 'pg';
import pool from '../db';
import type { ProductsSection } from '../types';

export const getProductsSections = async (
	categoryId: number
): Promise<ProductsSection[]> => {
	const res: QueryResult<ProductsSection> = await pool.query(
		`SELECT id, title, subheading, description, external_link AS "externalLink"
        FROM products_sections
        WHERE products_id = $1
        ORDER BY section_index ASC`,
		[categoryId]
	);
	return res.rows;
};
