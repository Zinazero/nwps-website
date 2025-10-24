import express from 'express';
import { sendContactEmail } from '../services/email.services';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    await sendContactEmail(req.body);
    res.status(200).json({ message: 'Contact email sent successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
