import type { QueryResult } from 'pg';
import pool from '../db';
import { ProductOrder, ProductsCategory, ProductsSection } from '../types';
import { postProductsSections } from './productsSections.repository';

export const getAllProductsCategories = async (): Promise<
	ProductsCategory[]
> => {
	const res: QueryResult<ProductsCategory> = await pool.query(
		'SELECT id, title, description FROM products ORDER BY sort_order ASC'
	);
	return res.rows;
};

export const getProductsCategoryByTitle = async (
	title: string
): Promise<ProductsCategory> => {
	const res: QueryResult<ProductsCategory> = await pool.query(
		'SELECT id, title, subheading, description FROM products WHERE title = $1',
		[title]
	);
	return res.rows[0];
};

export const getProductsCategoryById = async (
	categoryId: number
): Promise<ProductsCategory> => {
	const res: QueryResult<ProductsCategory> = await pool.query(
		'SELECT id, title, subheading, description FROM products WHERE id = $1',
		[categoryId]
	);
	return res.rows[0];
};

export const postProductsCategory = async (
	products: ProductsCategory,
	sections: ProductsSection[]
) => {
	const { title, subheading, description } = products;

	const client = await pool.connect();

	try {
		await client.query('BEGIN');

		await client.query('UPDATE products SET sort_order = sort_order + 1');

		const res: QueryResult<{ id: number }> = await client.query(
			'INSERT INTO products (title, subheading, description) VALUES ($1, $2, $3) RETURNING id',
			[title, subheading, description]
		);

		if (sections.length > 0) {
			const productsSections = sections.map((section) => ({
				...section,
				products_id: res.rows[0].id,
			}));
			await postProductsSections(productsSections, client);
		}

		await client.query('COMMIT');
	} catch (err) {
		await client.query('ROLLBACK');

		throw err;
	} finally {
		client.release();
	}
};

export const updateProductsCategory = async (
	products: ProductsCategory,
	sections: ProductsSection[]
) => {
	const { id, title, subheading, description } = products;

	const client = await pool.connect();

	try {
		await client.query('BEGIN');

		await client.query(
			'UPDATE products SET title = $1, subheading = $2, description = $3 WHERE id = $4',
			[title, subheading, description, id]
		);

		if (sections.length > 0) {
			const productsSections = sections.map((section) => ({
				...section,
				products_id: id,
			}));
			await postProductsSections(productsSections, client);
		}

		await client.query('COMMIT');
	} catch (err) {
		await client.query('ROLLBACK');
		throw err;
	} finally {
		client.release();
	}
};

export const reorderProducts = async (
	productOrder: ProductOrder
): Promise<number> => {
	const { id, sort_order } = productOrder;

	const res: QueryResult = await pool.query(
		'UPDATE products SET sort_order = $1 WHERE id = $2',
		[sort_order, id]
	);

	return res.rowCount as number;
};

export const deleteProductsCategory = async (
	productsId: number
): Promise<number> => {
	const res: QueryResult = await pool.query(
		'DELETE FROM products WHERE id = $1',
		[productsId]
	);
	return res.rowCount as number;
};
