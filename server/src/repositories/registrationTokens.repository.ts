import pool from '../db';

export const createRegistrationToken = async (email: string, token: string, expiresAt: Date) => {
  await pool.query(
    'INSERT INTO registration_tokens (email, token, expires_at) VALUES ($1, $2) RETURNING id, username',
    [email, token, expiresAt],
  );
};
