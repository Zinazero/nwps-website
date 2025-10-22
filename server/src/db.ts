import { Pool } from 'pg';
import type { Pool as PgPool } from 'pg';

const pool: PgPool = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: Number(process.env.PG_PORT) || 5432,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000,
});

pool
	.connect()
	.then((client) => {
		console.log('Connected to PostgreSQL');
		client.release();
	})
	.catch((err) => console.error('PostrgreSQL connection error', err));

export default pool;
