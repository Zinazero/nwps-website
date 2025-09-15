import pool from '../db/db';

interface Park {
	id: number;
	name: string;
	location: string;
	description: string;
}

interface PortfolioSection {
	id: number;
	title: string;
	description: string;
}

export const getAllParks = async (): Promise<Park[]> => {
	const res = await pool.query<Park>(
		'SELECT id, name, location, description FROM parks ORDER BY id'
	);
	return res.rows;
};

export const getParkPortfolio = async (
  id: number
): Promise<PortfolioSection[]> => {
  const res = await pool.query<PortfolioSection>(
    `
      SELECT id, title, description
      FROM portfolio_sections
      WHERE park_id = $1
      ORDER BY id
    `,
    [id]
  );

  return res.rows;
};
