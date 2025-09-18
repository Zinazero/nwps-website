import pool from '../db';
import { Park, ParkOrder } from '../types';

export const getAllParks = async (): Promise<Park[]> => {
	const res = await pool.query<Park>(
		'SELECT id, title, location, description FROM parks ORDER BY sort_order ASC'
	);
	return res.rows;
};

export const postPark = async (park: Park): Promise<Park> => {
	const { title, location, description } = park;

	const res = await pool.query(
		'INSERT INTO parks (title, location, description) VALUES ($1, $2, $3) RETURNING id',
		[title, location, description]
	);

	return res.rows[0].id;
};

export const reorderParks = async (parkOrder: ParkOrder) => {
	const { id, sort_order } = parkOrder;

	await pool.query('UPDATE parks SET sort_order = $1 WHERE id = $2', [
		sort_order,
		id,
	]);
};
