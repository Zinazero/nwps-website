import fs from 'node:fs';
import path from 'node:path';
import { prerender } from 'react-dom/static';
import App from './src/App';
import { MemoryRouter } from 'react-router-dom';
import 'dotenv/config';
import { AuthProvider } from './src/contexts/AuthContext';
import { ProductsProvider } from './src/contexts/ProductsContext';
import { RecentProjectsProvider } from './src/contexts/RecentProjectsContext';

export const CLIENT_BASE = process.env.VITE_CLIENT_BASE || 'http://localhost:5173';
export const SERVER_BASE = process.env.VITE_SERVER_BASE || 'http://localhost:5004';
export const OPTIMIZER_BASE = process.env.VITE_IMAGE_OPTIMIZER_BASE || 'http://localhost:4000';
export const NODE_ENV = process.env.VITE_NODE_ENV || 'development';

const staticRoutes = [
  '/',
  '/about',
  '/portfolio',
  '/products',
  '/testimonials',
  '/contact',
  '/store',
  '/store/checkout',
];

const fetchSlugs = async (apiSlug: string): Promise<string[]> => {
  try {
    if (!SERVER_BASE) throw new Error('SERVER_BASE not defined');
    
    const res = await fetch(`${SERVER_BASE}/api/${apiSlug}/slugs`);
    if (!res.ok) throw new Error(`Failed to fetch ${apiSlug} slugs: ${res.status}`);

    const slugs: string[] = await res.json();
    return slugs;
  } catch (err) {
    console.error(`Error fetching ${apiSlug} slugs:`, err);
    return [];
  }
};


const streamToString = async (stream: ReadableStream<Uint8Array>) => {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return new TextDecoder().decode(result);
};

const prerenderPage = async (route: string) => {
  const { prelude } = await prerender(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <ProductsProvider>
          <RecentProjectsProvider>
            <App />
          </RecentProjectsProvider>
        </ProductsProvider>
      </AuthProvider>
    </MemoryRouter>,
  );

  const html = await streamToString(prelude);

  const outputDir = path.join(process.cwd(), 'dist', ...route.replace(/^\//, '').split('/'));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(path.join(outputDir, 'index.html'), html);
  console.log(`Prerendered ${route}`);
};

async function build() {
  // Prerender static routes
  for (const route of staticRoutes) {
    await prerenderPage(route);
  }

  // Fetch dynamic provider slugs
  const providerSlugs = await fetchSlugs('providers');
  for (const slug of providerSlugs) {
    await prerenderPage(`/providers/${slug}`);
  }

  // Fetch dynamic park slugs
  const parkSlugs = await fetchSlugs('parks');
  for (const slug of parkSlugs) {
    await prerenderPage(`/portfolio/${slug}`);
  }

  // Fetch dynamic product slugs
  const productSlugs = await fetchSlugs('products');
  for (const slug of productSlugs) {
    await prerenderPage(`/products/${slug}`);
  }

  console.log('All routes prerendered!');
}

build().catch(console.error);
