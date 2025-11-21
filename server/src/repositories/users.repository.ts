import pool from '../db';

export const findUserByUsername = async (
  username: string,
): Promise<{ id: number; username: string; level: number; password_hash: string }> => {
  const result = await pool.query(
    `SELECT u.id, u.username, r.level, u.password_hash
      FROM users u
      JOIN roles r ON u.role_id = r.id
      WHERE u.username = $1`,
    [username],
  );
  return result.rows[0] || null;
};

export const createUser = async (username: string, passwordHash: string) => {
  const result = await pool.query(
    'INSERT INTO users (username, password_hash) VALUES ($1, $2) returning username',
    [username, passwordHash],
  );
  return result.rows[0].username;
};
