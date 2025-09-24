import type { QueryResult } from 'pg';
import pool from '../db';
import { ProductsCategory } from '../types';

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
		'SELECT id, title, description FROM products WHERE title = $1',
		[title]
	);
	return res.rows[0];
};

export const getProductsCategoryById = async (
	categoryId: number
): Promise<ProductsCategory> => {
	const res: QueryResult<ProductsCategory> = await pool.query(
		'SELECT id, title, description FROM products WHERE id = $1',
		[categoryId]
	);
	return res.rows[0];
};
