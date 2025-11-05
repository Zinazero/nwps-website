import type { QueryResult } from 'pg';
import pool from '../db';
import { DbError, OrderInfo, OrderItem } from '../types';
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
  const year = new Date().getFullYear();

  let orderNumber: string;
  let inserted = false;
  try {
    while (!inserted) {
      const random = Math.floor(10000 + Math.random() * 90000);
      orderNumber = `NWPS-${year}-${random}`;

      try {
        await client.query('BEGIN');

        const res: QueryResult<{ id: number }> = await client.query(
          `INSERT INTO orders 
            (first_name, last_name, company, phone, email, address_1, address_2, city, province, postal_code, message, order_number)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
           RETURNING id`,
          [
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
            orderNumber,
          ],
        );

        const orderId = res.rows[0].id;
        await postOrderItems(orderId, cart, client);

        await client.query('COMMIT');
        inserted = true;
        return orderNumber;
      } catch (err: unknown) {
        const error = err as DbError;
        await client.query('ROLLBACK');
        if (error.code !== '23505') throw err;
      }
    }
  } finally {
    client.release();
  }
};
