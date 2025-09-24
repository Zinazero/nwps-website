import express from 'express';
import {
	getAllProductsCategories,
	getProductsCategoryByTitle,
} from '../repositories/products.repository';
import { slugToTitleConverter } from '../utils/slugConverter';
import { getProductsSections } from '../repositories/productsSections.repository';

const router = express.Router();

//GET ROUTES
router.get('/', async (req, res) => {
	try {
		const categories = await getAllProductsCategories();
		res.json(categories);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error.' });
	}
});

router.get('/by-category/:category', async (req, res) => {
	const slug = req.params.category;
	const title = slugToTitleConverter(slug);

	try {
		const category = await getProductsCategoryByTitle(title);
		const sections = await getProductsSections(category.id);
		res.json({ category, sections });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error.' });
	}
});

router.get('/:id', async (req, res) => {
	const id = Number(req.params.id);

	try {
		const sections = await getProductsSections(id);
		res.json(sections);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error.' });
	}
});

//POST ROUTES
