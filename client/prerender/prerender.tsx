import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? '.env.production' : '.env'),
});

import axios from 'axios';
import { prerender } from 'react-dom/static';
import { MemoryRouter } from 'react-router-dom';
import App from '../src/App';
import type { LinkType } from '../src/components/layout/types';
import { AuthProvider } from '../src/contexts/AuthContext';
import { PrerenderProvider } from '../src/contexts/PrerenderContext';
import { ProductsProvider } from '../src/contexts/ProductsContext';
import { RecentProjectsProvider } from '../src/contexts/RecentProjectsContext';
import type { Provider, StoreItem } from '../src/pages/types';
import type { PrerenderData, PrPark, PrProductsCategory } from './types';

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

interface DynamicData {
  prerenderData?: PrerenderData;
  productSlugs?: string[];
  parkSlugs?: string[];
  providerSlugs?: string[];
}

const fetchDynamicData = async (): Promise<DynamicData> => {
  const SERVER_BASE = process.env.VITE_SERVER_BASE;

  try {
    // prProducts
    const productsRes = await axios.get<PrProductsCategory[]>(`${SERVER_BASE}/api/products/prerender`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    const prProducts = productsRes.data;

    // Product slugs
    const productSlugs = prProducts.map((p) => p.category.slug);

    // prProductsLinks
    const prProductsLinks: LinkType[] = prProducts.map(({ category }) => ({
      label: category.title,
      to: `/products/${category.slug}`,
    }));

    // prParks
    const parksRes = await axios.get<PrPark[]>(`${SERVER_BASE}/api/parks/prerender`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    const prParks = parksRes.data;

    // Park slugs
    const parkSlugs = prParks.map((p) => p.park.slug);

    // prRecentProjects
    const prRecentProjects = prParks.slice(0, 3).map((p) => p.park);

    // prProjectLinks
    const prProjectLinks: LinkType[] = prParks.map(({ park }) => ({
      label: park.title,
      to: `/portfolio/${park.slug}`,
    }));

    // prProviders
    const providersRes = await axios.get<Provider[]>(`${SERVER_BASE}/api/providers`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    const prProviders = providersRes.data;

    // Provider slugs
    const providerSlugs = prProviders.map((p) => p.slug);

    // prStoreItems
    const storeItemsRes = await axios.get<StoreItem[]>(`${SERVER_BASE}/api/store`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    const prStoreItems = storeItemsRes.data;

    const prerenderData: PrerenderData = {
      prProducts,
      prProductsLinks,
      prParks,
      prRecentProjects,
      prProjectLinks,
      prProviders,
      prStoreItems,
    };

    return { prerenderData, productSlugs, parkSlugs, providerSlugs };
  } catch (err) {
    console.error('Error fetching dynamic route data:', err);
    return {};
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

const prerenderPage = async (route: string, prData?: PrerenderData) => {
  const { prelude } = await prerender(
    <MemoryRouter initialEntries={[route]}>
      <PrerenderProvider data={prData || {}}>
        <AuthProvider>
          <ProductsProvider>
            <RecentProjectsProvider>
              <App />
            </RecentProjectsProvider>
          </ProductsProvider>
        </AuthProvider>
      </PrerenderProvider>
    </MemoryRouter>,
  );

  const html = await streamToString(prelude);

  const outputDir = path.join(process.cwd(), 'dist', 'prerender', ...route.replace(/^\//, '').split('/'));
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(
    path.join(outputDir, 'index.html'),
    '<!DOCTYPE html>\n' + html.replace(/(href|src)="(\.\/)/g, '$1="/'),
  );

  console.log(`Prerendered ${route}`);
};

async function build() {
  const { prerenderData, productSlugs, parkSlugs, providerSlugs } = await fetchDynamicData();

  // Prerender static routes
  for (const route of staticRoutes) {
    await prerenderPage(route, prerenderData);
  }

  if (prerenderData) {
    // Fetch dynamic product slugs
    if (productSlugs) {
      for (const slug of productSlugs) {
        await prerenderPage(`/products/${slug}`, prerenderData);
      }
    }

    // Fetch dynamic park slugs
    if (parkSlugs) {
      for (const slug of parkSlugs) {
        await prerenderPage(`/portfolio/${slug}`, prerenderData);
      }
    }

    // Fetch dynamic provider slugs
    if (providerSlugs) {
      for (const slug of providerSlugs) {
        await prerenderPage(`/providers/${slug}`, prerenderData);
      }
    }
  }

  console.log('All routes prerendered!');
}

build().catch(console.error);
