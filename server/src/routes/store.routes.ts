import express from 'express';
import { postOrder } from '../repositories/orders.repository';
import { getAllStoreItems } from '../repositories/storeItems.repository';
import { sendAdminAlert, sendInvoiceRequest, sendOrderConfirmation } from '../services/email.services';
import { retry } from '../utils/retry';

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

    const orderNumber = await postOrder(orderInfo, cart);

    const invoiceInfo = { orderNumber, ...orderInfo };

    // Internal email (critical)
    try {
      await retry(() => sendInvoiceRequest(invoiceInfo, cart), 5, 2000, 2);
      console.log('Internal invoice request sent successfully.');
    } catch (err) {
      console.error('Failed to send internal invoice request after retries:', err);
      await sendAdminAlert(
        'Invoice Request Email Failure',
        `Order #${orderNumber} failed to send to staff.\nError: ${err}`,
      );
    }

    // Customer email (non-blocking)
    retry(() => sendOrderConfirmation(invoiceInfo, cart), 5, 2000, 2).catch(async (err) => {
      console.error('Failed to send order confirmation after retries:', err);
      await sendAdminAlert(
        'Customer Email Failure',
        `Order #${orderNumber} failed to send confirmation to ${invoiceInfo.email}.\nError: ${err}`,
      );
    });

    res.status(201).json({ orderNumber });
  } catch (err) {
    console.error(err);

    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
