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
	for (const [i, section] of sections.entries()) {
		const { park_id, title, description } = section;

		await pool.query(
			`
      			INSERT INTO portfolio_sections (park_id, section_index, title, description)
      			VALUES ($1, $2, $3, $4)
				ON CONFLICT (park_id, section_index)
				DO UPDATE SET
					title = EXCLUDED.title,
					description = EXCLUDED.description
      		`,
			[park_id, i, title, description]
		);
	}
};
