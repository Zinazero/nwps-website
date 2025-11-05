import type { Pool as PgPool } from 'pg';
import { Pool } from 'pg';
import env from './config/env';

const pool: PgPool = new Pool({
  user: env.PG_USER,
  host: env.PG_HOST,
  database: env.PG_DATABASE,
  password: env.PG_PASSWORD,
  port: env.PG_PORT,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

pool
  .connect()
  .then((client) => {
    console.log('Connected to PostgreSQL');
    client.release();
  })
  .catch((err) => console.error('PostrgreSQL connection error', err));

export default pool;
