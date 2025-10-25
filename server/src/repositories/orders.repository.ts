import type { QueryResult } from 'pg';
import pool from '../db';
import { OrderInfo, OrderItem } from '../types';
import { postOrderItems } from './orderItems.repository';

export const postOrder = async (orderInfo: OrderInfo, cart: OrderItem[]) => {
  const {
    firstName,
    lastName,
    company,
    phone,
    email,
    address1,
    address2,
    city,
    province,
    postalCode,
    message,
  } = orderInfo;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert Order Info into orders table
    const res: QueryResult<{ id: number }> = await client.query(
      `INSERT INTO orders 
            (first_name, last_name, company, phone, email, address_1, address_2, city, province, postal_code, message)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING id`,
      [firstName, lastName, company, phone, email, address1, address2, city, province, postalCode, message],
    );
    const orderId = res.rows[0].id;

    // Insert Order Items into order_items table
    await postOrderItems(orderId, cart, client);

    await client.query('COMMIT');
    return orderId;
  } catch (err: unknown) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
};
