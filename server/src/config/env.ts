interface Env {
	NODE_ENV: string;
	PG_USER: string;
	PG_HOST: string;
	PG_DATABASE: string;
	PG_PASSWORD: string;
	PG_PORT: number;
	EMAIL_SENDER: string;
	EMAIL_RECEIVER: string;
	RESEND_API_KEY: string;
	JWT_SECRET: string;
}

const env: Env = {
	NODE_ENV: process.env.NODE_ENV || 'development',
	PG_USER: process.env.PG_USER || '',
	PG_HOST: process.env.PG_HOST || '',
	PG_DATABASE: process.env.PG_DATABASE || '',
	PG_PASSWORD: process.env.PG_PASSWORD || '',
	PG_PORT: Number(process.env.PG_PORT) || 5432,
	EMAIL_SENDER: process.env.EMAIL_SENDER || '',
	EMAIL_RECEIVER: process.env.EMAIL_RECEIVER || '',
	RESEND_API_KEY: process.env.RESEND_API_KEY || '',
	JWT_SECRET: process.env.JWT_SECRET || '',
};

for (const [key, value] of Object.entries(env)) {
	if (!value) throw new Error(`Missing environment variable: ${key}`);
}

export default env;
