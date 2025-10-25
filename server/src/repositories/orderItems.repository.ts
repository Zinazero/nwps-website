import { PoolClient } from 'pg';
import { OrderItem } from '../types';

export const postOrderItems = async (orderId: number, cart: OrderItem[], client: PoolClient) => {
  for (const item of cart) {
    const { id, quantity } = item;

    await client.query(
      `INSERT INTO order_items
            (order_id, item_id, quantity)
        VALUES ($1, $2, $3)`,
      [orderId, id, quantity],
    );
  }
};
