import pool from '../db';
import { PortfolioSection } from '../types';

export const getParkPortfolio = async (
	parkId: number
): Promise<PortfolioSection[]> => {
	const res = await pool.query<PortfolioSection>(
		`
    SELECT id, title, description
    FROM portfolio_sections
    WHERE park_id = $1
    ORDER BY id
  `,
		[parkId]
	);

	return res.rows;
};

export const postPortfolioSections = async (sections: PortfolioSection[]) => {
	for (const section of sections) {
		const { park_id, title, description } = section;

		await pool.query(
			`
      INSERT INTO portfolio_sections (park_id, title, description)
      VALUES ($1, $2, $3)
      `,
			[park_id, title, description]
		);
	}
};

export const updatePortolioSections = async (sections: PortfolioSection[]) => {
	for (const section of sections) {
		const { park_id, title, description } = section;

		await pool.query(
			'UPDATE portfolio_sections SET title = $1, description = $2 WHERE park_id = $3',
			[title, description, park_id]
		);
	}
};
