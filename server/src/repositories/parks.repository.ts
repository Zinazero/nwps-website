import pool from '../db';
import { Park } from '../types';

export const getAllParks = async (): Promise<Park[]> => {
	const res = await pool.query<Park>(
		'SELECT id, title, location, description FROM parks ORDER BY id'
	);
	return res.rows;
};

export const postPark = async (park: Park): Promise<Park> => {
	const { title, location, description } = park;

	const res = await pool.query(
		`INSERT INTO parks (title, location, description) VALUES ($1, $2, $3) RETURNING id`,
		[title, location, description]
	);

  return res.rows[0].id;
};
