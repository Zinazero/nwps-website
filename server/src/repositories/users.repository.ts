import pool from '../db';

export const findUserByUsername = async (username: string) => {
	const result = await pool.query('SELECT * FROM users WHERE username = $1', [
		username,
	]);
	return result.rows[0] || null;
};

export const createUser = async (username: string, passwordHash: string) => {
	const result = await pool.query(
		'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username',
		[username, passwordHash]
	);
	return result.rows[0];
};
