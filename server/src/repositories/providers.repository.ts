import { QueryResult } from 'pg';
import pool from '../db';

interface Provider {
	title: string;
	blurb: string;
	description: string;
	externalLink: string;
	slug: string;
}

export const getAllProviders = async (): Promise<Provider[]> => {
	const res: QueryResult<Provider> = await pool.query(
		'SELECT title, blurb, description, external_link AS "externalLink", slug FROM providers ORDER BY title'
	);
	return res.rows;
};

export const getProviderBySlug = async (slug: string): Promise<Provider> => {
	const res: QueryResult<Provider> = await pool.query(
		'SELECT title, blurb, description, external_link AS "externalLink" FROM providers WHERE slug = $1',
		[slug]
	);
	return res.rows[0];
};

export const postProvider = async (provider: Provider) => {
	const { title, blurb, description, externalLink, slug } = provider;

	try {
		await pool.query(
			'INSERT INTO providers (title, blurb, description, external_link, slug) VALUES ($1, $2, $3, $4, $5)',
			[title, blurb, description, externalLink, slug]
		);
	} catch (err) {
		throw err;
	}
};
