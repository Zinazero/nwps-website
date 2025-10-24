import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import {
  deletePark,
  getAllParks,
  getParkById,
  getParkBySlug,
  getRecentParks,
  postPark,
  reorderParks,
  updatePark,
} from '../repositories/parks.repository';
import { getParkPortfolio } from '../repositories/portfolioSections.repository';
import { ParkOrder } from '../types';
import { ensureFolder, renameFilesInFolder, upload, writeFiles } from '../utils/multer';
import { titleToSlugConverter } from '../utils/titleToSlugConverter';

const router = express.Router();

// GET ROUTES
router.get('/', async (_req, res) => {
  try {
    const parks = await getAllParks();
    res.json(parks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/recent', async (_req, res) => {
  try {
    const recentProjects = await getRecentParks();
    res.json(recentProjects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/by-slug/:slug', async (req, res) => {
  const slug = req.params.slug;

  try {
    const park = await getParkBySlug(slug);
    const sections = await getParkPortfolio(park.id);
    res.json({ park, sections });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  try {
    const sections = await getParkPortfolio(id);
    res.json(sections);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// POST ROUTES
router.post('/post-park', upload.any(), async (req, res) => {
  try {
    const parkInfo = JSON.parse(req.body.data);
    const park = parkInfo[0];
    const sections = parkInfo.slice(1);
    const isUpdate = !!park.id;
    const slug = titleToSlugConverter(park.title);
    park.slug = slug;

    if (isUpdate) {
      // Update existing park
      await updatePark(park, sections);
    } else {
      // Insert new park
      await postPark(park, sections);
    }

    const folder = path.join(__dirname, '../../../client/public/images/playgrounds', slug);

    // Handle title/slug change
    if (isUpdate && park.originalTitle && park.originalTitle !== park.title) {
      const oldSlug = titleToSlugConverter(park.originalTitle);
      const oldFolder = path.join(__dirname, '../../../client/public/images/playgrounds', oldSlug);

      try {
        // Move folder
        await fs.rename(oldFolder, folder);

        // Rename files inside to match new slug
        await renameFilesInFolder(folder, oldSlug, slug);
      } catch (err) {
        const code = (err as NodeJS.ErrnoException)?.code;
        if (code === 'ENOENT') {
          await ensureFolder(folder);
        } else {
          console.error(`Failed to rename folder ${oldFolder} -> ${folder}`, err);
          throw err;
        }
      }
    } else {
      // Ensure folder exists for new products or unchanged slug
      await ensureFolder(folder);
    }

    // Write uploaded files (overwrite only uploaded ones)
    const files = req.files as Express.Multer.File[] | undefined;
    if (files && files.length > 0) {
      await writeFiles(folder, files, slug);
    }

    res.json({ message: park.id ? 'Park updated' : 'Park created' });
  } catch (err) {
    console.error(err);

    if (err instanceof Error && err.message === 'Title already exists.') {
      return res.status(400).json({ error: err.message });
    }

    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.post('/reorder', async (req, res) => {
  const updates = req.body;

  try {
    await Promise.all(updates.map((parkOrder: ParkOrder) => reorderParks(parkOrder)));

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving order');
  }
});

// DELETE ROUTES
router.delete('/:id', async (req, res) => {
  try {
    const parkId = Number(req.params.id);
    if (Number.isNaN(parkId)) return res.status(400).json({ error: 'Invalid park id' });

    const park = await getParkById(parkId);
    if (!park) return res.status(404).json({ error: 'Park not found' });

    const slug = titleToSlugConverter(park.title);
    const folderPath = path.join(__dirname, '../../../client/public/images/playgrounds', slug);

    // Delete images folder
    await fs.rm(folderPath, { recursive: true, force: true });

    const deletedCount = await deletePark(parkId);
    if (deletedCount === 0) return res.status(404).json({ error: 'Park not found' });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
