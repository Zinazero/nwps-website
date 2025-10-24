import type { QueryResult } from 'pg';
import pool from '../db';
import { DbError, Park, ParkOrder, PortfolioSection } from '../types';
import { postPortfolioSections } from './portfolioSections.repository';

export const getAllParks = async (): Promise<Park[]> => {
  const res: QueryResult<Park> = await pool.query(
    'SELECT id, title, location, description, blurb, slug FROM parks ORDER BY sort_order ASC',
  );
  return res.rows;
};

export const getRecentParks = async (): Promise<Park[]> => {
  const res: QueryResult<Park> = await pool.query(
    'SELECT id, title, location, description, blurb, slug FROM parks ORDER BY sort_order ASC LIMIT 3',
  );
  return res.rows;
};

export const getParkBySlug = async (slug: string): Promise<Park> => {
  const res: QueryResult<Park> = await pool.query(
    'SELECT id, title, location, description, blurb FROM parks WHERE slug = $1',
    [slug],
  );
  return res.rows[0];
};

export const getParkById = async (parkId: number): Promise<Park> => {
  const res: QueryResult<Park> = await pool.query(
    'SELECT id, title, location, description, blurb, slug FROM parks WHERE id = $1',
    [parkId],
  );
  return res.rows[0];
};

export const postPark = async (park: Park, sections: PortfolioSection[]) => {
  const { title, location, description, blurb, slug } = park;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('UPDATE parks SET sort_order = sort_order + 1');

    const res: QueryResult<{ id: number }> = await client.query(
      'INSERT INTO parks (title, location, description, blurb, slug) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [title, location, description, blurb, slug],
    );

    if (sections.length > 0) {
      const portfolioSections = sections.map((section) => ({
        ...section,
        park_id: res.rows[0].id,
      }));
      await postPortfolioSections(portfolioSections, client);
    }

    await client.query('COMMIT');
  } catch (err: unknown) {
    await client.query('ROLLBACK');
    const error = err as DbError;
    if (error.code === '23505') throw new Error('Title already exists.');
    throw err;
  } finally {
    client.release();
  }
};

export const updatePark = async (park: Park, sections: PortfolioSection[]) => {
  const { id, title, location, description, blurb } = park;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query(
      'UPDATE parks SET title = $1, location = $2, description = $3, blurb = $4 WHERE id = $5',
      [title, location, description, blurb, id],
    );

    if (sections.length > 0) {
      const portfolioSections = sections.map((section) => ({
        ...section,
        park_id: id,
      }));
      await postPortfolioSections(portfolioSections, client);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const reorderParks = async (parkOrder: ParkOrder): Promise<number> => {
  const { id, sort_order } = parkOrder;

  const res: QueryResult = await pool.query('UPDATE parks SET sort_order = $1 WHERE id = $2', [
    sort_order,
    id,
  ]);

  return res.rowCount as number;
};

export const deletePark = async (parkId: number): Promise<number> => {
  const res: QueryResult = await pool.query('DELETE FROM parks WHERE id = $1', [parkId]);
  return res.rowCount as number;
};
