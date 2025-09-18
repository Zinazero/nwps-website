import express from 'express';
import {
	getAllParks,
	postPark,
	reorderParks,
} from '../repositories/parks.repository';
import {
	getParkPortfolio,
	postPortfolioSections,
} from '../repositories/portfolioSections.repository';
import path from 'path';
import fs from 'fs';
import { slugConverter } from '../utils/slugConverter';
import { upload } from '../utils/multer';
import { ParkOrder } from '../types';

interface Section {
	park_id: number;
	title: string;
	description: string;
}

const router = express.Router();

//GET ROUTES
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

//POST ROUTES
router.post('/post-park', upload.any(), async (req, res) => {
	try {
		// Parse JSON
		const sections = JSON.parse(req.body.data);
		const park = sections[0];
		const slug = slugConverter(park.title);

		// Save park
		const parkId = await postPark(park);

		// Save portfolio sections
		if (sections.length > 1) {
			const portfolioSections = sections.slice(1).map((section: Section) => ({
				...section,
				park_id: parkId,
			}));
			await postPortfolioSections(portfolioSections);
		}

		// Save images
		const files = req.files as Express.Multer.File[] | undefined;
		if (!files || files.length === 0) {
			return res
				.status(400)
				.json({ error: 'At least one image file is required' });
		}

		const folder = path.join(
			__dirname,
			'../../../client/public/images/playgrounds',
			slug
		);

		fs.mkdirSync(folder, { recursive: true });

		files.forEach((file) => {
			const index = Number(file.fieldname);
			const title = `${slug}-${index + 1}`;
			const ext = path.extname(file.originalname);

			fs.writeFileSync(path.join(folder, `${title}${ext}`), file.buffer);
		});

		res.json({ message: 'Park saved' });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error.' });
	}
});

router.post('/reorder', async (req, res) => {
	const updates = req.body;

	try {
		await Promise.all(
			updates.map((parkOrder: ParkOrder) => reorderParks(parkOrder))
		);

		res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res.status(500).send('Error saving order');
	}
});

export default router;
