import express from 'express';
import { upload } from '../utils/multer';
import {
	getAllProviders,
	getProviderByTitle,
	postProvider,
} from '../repositories/providers.repository';
import {
	titleToSlugConverter,
	slugToTitleConverter,
} from '../utils/slugConverter';
import path from 'path';
import fs from 'fs/promises';

const router = express.Router();

//GET ROUTES
router.get('/', async (req, res) => {
	try {
		const providers = await getAllProviders();
		res.json(providers);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error.' });
	}
});

router.get('/:provider', async (req, res) => {
	const slug = req.params.provider;
	const title = slugToTitleConverter(slug);

	try {
		const provider = await getProviderByTitle(title);
		res.json(provider);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Internal server error.' });
	}
});

//POST ROUTES
router.post('/post-provider', upload.any(), async (req, res) => {
	try {
		const provider = JSON.parse(req.body.data);
		const slug = titleToSlugConverter(provider.title);

		await postProvider(provider);

		const files = req.files as Express.Multer.File[] | undefined;
		if (files && files.length > 0) {
			const folder = path.join(
				__dirname,
				'../../../client/public/images/providers',
				slug
			);

			await fs.mkdir(folder, { recursive: true });
			for (const file of files) {
				const title = file.fieldname === 'logo' ? `${slug}-logo` : `${slug}-1`;
				const ext = '.jpg'; //Currently enforcing .jpg

				await fs.writeFile(path.join(folder, `${title}${ext}`), file.buffer);
			}
		}

		res.json({ message: 'Provider added' });
	} catch (err: any) {
		console.error(err);

		res.status(500).json({ error: 'Internal server error.' });
	}
});

export default router;
