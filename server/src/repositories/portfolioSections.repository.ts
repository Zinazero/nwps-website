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

export const postPortfolioSections = async (
  sections: PortfolioSection[]
): Promise<PortfolioSection[]> => {
  const insertedSections: PortfolioSection[] = [];

  for (const section of sections) {
    const result = await pool.query<PortfolioSection>(
      `
      INSERT INTO portfolio_sections (park_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [section.park_id, section.title, section.description]
    );
    insertedSections.push(result.rows[0]);
  }

  return insertedSections;
};
