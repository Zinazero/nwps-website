import type { QueryResult } from 'pg';
import pool from '../db';
import { StoreItem } from '../types';

export const getAllStoreItems = async (): Promise<StoreItem[]> => {
  const res: QueryResult<StoreItem> = await pool.query(
    'SELECT id, increment, title FROM store_items ORDER BY id ASC',
  );
  return res.rows;
};
