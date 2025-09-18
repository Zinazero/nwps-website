import pool from '../db';
import { Park, ParkOrder } from '../types';
import type { QueryResult } from 'pg';

export const getAllParks = async (): Promise<Park[]> => {
	const res: QueryResult<Park> = await pool.query(
		'SELECT id, title, location, description FROM parks ORDER BY sort_order ASC'
	);
	return res.rows;
};

export const postPark = async (park: Park): Promise<number> => {
	const { title, location, description } = park;

	const res: QueryResult<{ id: number }> = await pool.query(
		'INSERT INTO parks (title, location, description) VALUES ($1, $2, $3) RETURNING id',
		[title, location, description]
	);

	return res.rows[0].id;
};

export const reorderParks = async (parkOrder: ParkOrder): Promise<number> => {
	const { id, sort_order } = parkOrder;

	const res: QueryResult = await pool.query(
		'UPDATE parks SET sort_order = $1 WHERE id = $2',
		[sort_order, id]
	);

	return res.rowCount as number;
};

export const deletePark = async (parkId: number): Promise<number> => {
	const res: QueryResult = await pool.query('DELETE FROM parks WHERE id = $1', [
		parkId,
	]);
	return res.rowCount as number;
};
