import express from 'express';
import { getAllParks, getParkPortfolio } from '../repositories/parkRepository';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const parks = await getAllParks();
		res.json(parks);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error.' });
	}
});

router.get('/:id', async (req, res) => {
	const id = Number(req.params.id);

	try {
		const portfolioSections = await getParkPortfolio(id);
		res.json(portfolioSections);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error.' });
	}
});

export default router;
