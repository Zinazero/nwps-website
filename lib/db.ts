import { Pool } from 'pg';
import type { Pool as PgPool } from 'pg';

declare global {
  // prevent multiple pools in development HMR
  // eslint-disable-next-line no-var
  var pgPool: PgPool | undefined;
}

const pool: PgPool = global.pgPool ?? new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: Number(process.env.PG_PORT) || 5432,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// save to global in dev for hot reloads
if (process.env.NODE_ENV !== 'production') global.pgPool = pool;

export default pool;
