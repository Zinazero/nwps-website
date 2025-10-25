import express from 'express';
import { getAllStoreItems } from '../repositories/storeItems.repository';
import { postOrder } from '../repositories/orders.repository';

const router = express.Router();

// GET ROUTES
router.get('/', async (_req, res) => {
  try {
    const storeItems = await getAllStoreItems();
    res.json(storeItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST ROUTES
router.post('/orders', async (req, res) => {
  try {
    const { cart, ...orderInfo } = req.body;

    const id = await postOrder(orderInfo, cart);
    res.status(201).json({ id });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
