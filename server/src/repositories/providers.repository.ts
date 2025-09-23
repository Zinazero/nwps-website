import { QueryResult } from 'pg';
import pool from '../db';

interface Provider {
	title: string;
	blurb: string;
	description: string;
	externalLink: string;
}

export const getAllProviders = async (): Promise<Provider[]> => {
	const res: QueryResult<Provider> = await pool.query(
		'SELECT title, blurb, description, external_link AS "externalLink" FROM providers ORDER BY title'
	);
	return res.rows;
};

export const getProviderByTitle = async (title: string): Promise<Provider> => {
    const res: QueryResult<Provider> = await pool.query(
        'SELECT title, blurb, description, external_link AS "externalLink" FROM providers WHERE title = $1',
        [title]  
    );
    return res.rows[0];
};

export const postProvider = async (provider: Provider) => {
	const { title, blurb, description, externalLink } = provider;

	try {
		await pool.query(
			'INSERT INTO providers (title, blurb, description, external_link) VALUES ($1, $2, $3, $4)',
			[title, blurb, description, externalLink]
		);
	} catch (err) {
		throw err;
	}
};
