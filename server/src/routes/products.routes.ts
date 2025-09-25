import express from 'express';
import {
	deleteProductsCategory,
	getAllProductsCategories,
	getProductsCategoryById,
	getProductsCategoryByTitle,
	postProductsCategory,
	updateProductsCategory,
} from '../repositories/products.repository';
import {
	slugToTitleConverter,
	titleToSlugConverter,
} from '../utils/slugConverter';
import { getProductsSections } from '../repositories/productsSections.repository';
import path from 'path';
import fs from 'fs/promises';
import { upload } from '../utils/multer';

const router = express.Router();

// GET ROUTES
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

// POST ROUTES
router.post('/post-products', upload.any(), async (req, res) => {
	try {
		const productsInfo = JSON.parse(req.body.data);
		const products = productsInfo[0];
		const sections = productsInfo.slice(1);
		const slug = titleToSlugConverter(products.title);

		if (products.id) {
			// Update existing park
			await updateProductsCategory(products, sections);
		} else {
			// Insert new park
			await postProductsCategory(products, sections);
		}

		// Save/overwrite images if any files are provided
		const files = req.files as Express.Multer.File[] | undefined;
		if (files && files.length > 0) {
			const folder = path.join(
				__dirname,
				'../../../client/public/images/products',
				slug
			);

			// Delete old images first if updating
			if (products.id) {
				try {
					await fs.rm(folder, { recursive: true, force: true });
				} catch (err) {
					console.warn(`Failed to delete folder ${folder}:`, err);
				}
			}

			// Recreate folder and write new files
			await fs.mkdir(folder, { recursive: true });
			for (const file of files) {
				const index = Number(file.fieldname);
				const title = `${slug}-${index + 1}`;
				const ext = path.extname(file.originalname);

				await fs.writeFile(path.join(folder, `${title}${ext}`), file.buffer);
			}
		}

		res.json({ message: products.id ? 'Park updated' : 'Park created' });
	} catch (err: any) {
		console.error(err);

		if (err.message === 'Title already exists.') {
			return res.status(400).json({ error: err.message });
		}

		res.status(500).json({ error: 'Internal server error.' });
	}
});

// DELETE ROUTES
router.delete('/:id', async (req, res) => {
	try {
		const productsId = Number(req.params.id);
		if (isNaN(productsId))
			return res.status(400).json({ error: 'Invalid category id' });

		const category = await getProductsCategoryById(productsId);
		if (!category)
			return res.status(404).json({ error: 'Products Category not found' });

		const slug = titleToSlugConverter(category.title);
		const folderPath = path.join(
			__dirname,
			'../../../client/public/images/products',
			slug
		);

		// Delete images folder
		await fs.rm(folderPath, { recursive: true, force: true });

		const deletedCount = await deleteProductsCategory(productsId);
		if (deletedCount === 0)
			return res.status(404).json({ error: 'Products Category not found' });

		res.sendStatus(204);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error' });
	}
});

export default router;
