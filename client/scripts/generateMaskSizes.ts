import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const masksDir = path.resolve(__dirname, '../public/masks');
const outputFile = path.resolve(__dirname, '../src/masks.json');

const masks = fs.readdirSync(masksDir).filter((f) => f.toLowerCase().endsWith('.svg'));

const result: Record<string, { width: number; height: number }> = {};

(async () => {
  for (const mask of masks) {
    const buffer = fs.readFileSync(path.join(masksDir, mask));
    const { width, height } = await sharp(buffer).metadata();
    result[mask] = { width: width || 0, height: height || 0 };
  }

  fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));
  console.log('Mask sizes generated:', result);
})();
