import type { QueryResult } from 'pg';
import pool from '../db';
import { ProductOrder, ProductsCategory, ProductsSection, Route } from '../types';
import { postProductsSections } from './productsSections.repository';

export const getAllProductsCategories = async (): Promise<ProductsCategory[]> => {
  const res: QueryResult<ProductsCategory> = await pool.query(
    'SELECT id, title, description, slug FROM products ORDER BY sort_order ASC',
  );
  return res.rows;
};

export const getProductsCategoryBySlug = async (slug: string): Promise<ProductsCategory> => {
  const res: QueryResult<ProductsCategory> = await pool.query(
    'SELECT id, title, subheading, description FROM products WHERE slug = $1',
    [slug],
  );
  return res.rows[0];
};

export const getProductsCategoryById = async (categoryId: number): Promise<ProductsCategory> => {
  const res: QueryResult<ProductsCategory> = await pool.query(
    'SELECT id, title, subheading, description, slug FROM products WHERE id = $1',
    [categoryId],
  );
  return res.rows[0];
};

export const getProductRoutes = async (): Promise<Route[]> => {
  const res: QueryResult<{ slug: string, updated_at: string }> = await pool.query('SELECT slug, updated_at FROM products');
    const routes = res.rows.map((row) => ({
    url: `/products/${row.slug}`,
    lastmod: row.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
  }));

  return routes;
};

export const postProductsCategory = async (products: ProductsCategory, sections: ProductsSection[]) => {
  const { title, subheading, description, slug } = products;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('UPDATE products SET sort_order = sort_order + 1');

    const res: QueryResult<{ id: number }> = await client.query(
      'INSERT INTO products (title, subheading, description, slug) VALUES ($1, $2, $3, $4) RETURNING id',
      [title, subheading, description, slug],
    );

    if (sections.length > 0) {
      const productsSections = sections.map((section) => ({
        ...section,
        products_id: res.rows[0].id,
      }));
      await postProductsSections(productsSections, client);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');

    throw err;
  } finally {
    client.release();
  }
};

export const updateProductsCategory = async (products: ProductsCategory, sections: ProductsSection[]) => {
  const { id, title, subheading, description } = products;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    await client.query('UPDATE products SET title = $1, subheading = $2, description = $3 WHERE id = $4', [
      title,
      subheading,
      description,
      id,
    ]);

    if (sections.length > 0) {
      const productsSections = sections.map((section) => ({
        ...section,
        products_id: id,
      }));
      await postProductsSections(productsSections, client);
    }

    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};

export const reorderProducts = async (productOrder: ProductOrder): Promise<number> => {
  const { id, sort_order } = productOrder;

  const res: QueryResult = await pool.query('UPDATE products SET sort_order = $1 WHERE id = $2', [
    sort_order,
    id,
  ]);

  return res.rowCount as number;
};

export const deleteProductsCategory = async (productsId: number): Promise<number> => {
  const res: QueryResult = await pool.query('DELETE FROM products WHERE id = $1', [productsId]);
  return res.rowCount as number;
};
