import fs from 'node:fs/promises';
import path from 'node:path';
import express from 'express';
import {
  deleteProductsCategory,
  getAllProductsCategories,
  getProductsCategoryById,
  getProductsCategoryBySlug,
  getProductSlugs,
  postProductsCategory,
  reorderProducts,
  updateProductsCategory,
} from '../repositories/products.repository';
import { getProductsSections } from '../repositories/productsSections.repository';
import { ProductOrder } from '../types';
import { ensureFolder, renameFilesInFolder, upload, writeFiles } from '../utils/multer';
import { titleToSlugConverter } from '../utils/titleToSlugConverter';

const router = express.Router();

// GET ROUTES
router.get('/', async (_req, res) => {
  try {
    const categories = await getAllProductsCategories();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/slugs', async (_req, res) => {
  try {
    const productSlugs = await getProductSlugs();
    res.json(productSlugs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.get('/by-slug/:slug', async (req, res) => {
  const slug = req.params.slug;

  try {
    const category = await getProductsCategoryBySlug(slug);
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
    const isUpdate = !!products.id;
    const slug = titleToSlugConverter(products.title);
    products.slug = slug;

    // Insert/update DB
    if (isUpdate) {
      await updateProductsCategory(products, sections);
    } else {
      await postProductsCategory(products, sections);
    }

    const folder = path.join(__dirname, '../../../client/public/images/products', slug);

    // Handle title/slug change
    if (isUpdate && products.originalTitle && products.originalTitle !== products.title) {
      const oldSlug = titleToSlugConverter(products.originalTitle);
      const oldFolder = path.join(__dirname, '../../../client/public/images/products', oldSlug);

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

    res.json({ message: isUpdate ? 'Product updated' : 'Product created' });
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
    await Promise.all(updates.map((productOrder: ProductOrder) => reorderProducts(productOrder)));

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving order');
  }
});

// DELETE ROUTES
router.delete('/:id', async (req, res) => {
  try {
    const productsId = Number(req.params.id);
    if (Number.isNaN(productsId)) return res.status(400).json({ error: 'Invalid category id' });

    const category = await getProductsCategoryById(productsId);
    if (!category) return res.status(404).json({ error: 'Products Category not found' });

    const slug = titleToSlugConverter(category.title);
    const folderPath = path.join(__dirname, '../../../client/public/images/products', slug);

    // Delete images folder
    await fs.rm(folderPath, { recursive: true, force: true });

    const deletedCount = await deleteProductsCategory(productsId);
    if (deletedCount === 0) return res.status(404).json({ error: 'Products Category not found' });

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
