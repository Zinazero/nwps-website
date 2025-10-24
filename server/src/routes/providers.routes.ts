import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import { getAllProviders, getProviderBySlug, postProvider } from '../repositories/providers.repository';
import { upload } from '../utils/multer';
import { titleToSlugConverter } from '../utils/titleToSlugConverter';

const router = express.Router();

//GET ROUTES
router.get('/', async (_req, res) => {
  try {
    const providers = await getAllProviders();
    res.json(providers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/:slug', async (req, res) => {
  const slug = req.params.slug;

  try {
    const provider = await getProviderBySlug(slug);
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
    provider.slug = slug;

    await postProvider(provider);

    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      const folder = path.join(__dirname, '../../../client/public/images/providers', slug);

      await fs.mkdir(folder, { recursive: true });
      for (const file of files) {
        const title = file.fieldname === 'logo' ? `${slug}-logo` : `${slug}-1`;
        const ext = '.jpg'; //Currently enforcing .jpg

        await fs.writeFile(path.join(folder, `${title}${ext}`), file.buffer);
      }
    }

    res.json({ message: 'Provider added' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;
