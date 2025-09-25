import { PoolClient, QueryResult } from 'pg';
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

export const postProductsSections = async (
	sections: ProductsSection[],
	client: PoolClient
) => {
	for (const [i, section] of sections.entries()) {
		const { products_id, title, subheading, description, externalLink } =
			section;

		await client.query(
			`INSERT INTO products_sections (products_id, section_index, title, subheading, description, external_link)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT (products_id, section_index)
                DO UPDATE SET
                    title = EXCLUDED.title,
                    subheading = EXCLUDED.subheading,
                    description = EXCLUDED.description`,
			[products_id, i, title, subheading, description, externalLink]
		);
	}
};
