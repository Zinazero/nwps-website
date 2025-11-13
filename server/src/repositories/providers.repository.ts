import { QueryResult } from 'pg';
import pool from '../db';
import { Route } from '../types';

interface Provider {
  title: string;
  blurb: string;
  description: string;
  externalLink: string;
  slug: string;
}

export const getAllProviders = async (): Promise<Provider[]> => {
  const res: QueryResult<Provider> = await pool.query(
    'SELECT title, blurb, description, external_link AS "externalLink", slug FROM providers ORDER BY title',
  );
  return res.rows;
};

export const getProviderBySlug = async (slug: string): Promise<Provider> => {
  const res: QueryResult<Provider> = await pool.query(
    'SELECT title, blurb, description, external_link AS "externalLink" FROM providers WHERE slug = $1',
    [slug],
  );
  return res.rows[0];
};

export const postProvider = async (provider: Provider) => {
  const { title, blurb, description, externalLink, slug } = provider;

  await pool.query(
    'INSERT INTO providers (title, blurb, description, external_link, slug) VALUES ($1, $2, $3, $4, $5)',
    [title, blurb, description, externalLink, slug],
  );
};

export const getProviderSlugs = async (): Promise<Route[]> => {
  const res: QueryResult<{ slug: string; updated_at: string }> = await pool.query(
    'SELECT slug, updated_at FROM providers',
  );

  const routes = res.rows.map((row) => ({
    url: `/proviers/${row.slug}`,
    lastmod: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
  }));

  return routes;
};
