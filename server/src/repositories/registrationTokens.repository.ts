import pool from '../db';

export const createRegistrationToken = async (email: string, token: string, expiresAt: Date) => {
  await pool.query(
    'INSERT INTO registration_tokens (email, token, expires_at) VALUES ($1, $2) RETURNING id, username',
    [email, token, expiresAt],
  );
};

export const checkRegistrationToken = async (token: string): Promise<{ valid: boolean; email?: string }> => {
  const res = await pool.query(
    'SELECT email, expires_at FROM registration_tokens WHERE token = $1 AND used = false',
    [token],
  );
  const row = res.rows[0];

  if (!row) return { valid: false };

  if (row.expires_at < new Date()) {
    return { valid: false };
  }

  return { valid: true, email: row.email };
};

export const useRegistrationToken = async (token: string) => {
  await pool.query('UPDATE registration_tokens SET used = true WHERE token = $1', [token]);
};
