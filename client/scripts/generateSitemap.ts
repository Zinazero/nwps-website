import path from 'node:path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(process.cwd(), process.env.NODE_ENV === 'production' ? '.env.production' : '.env'),
});

import { writeFileSync } from 'node:fs';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Route } from './types';
import { createSitemapEntries } from './utils/createSitemapEntries';
import { fetchDynamicRoutes } from './utils/fetchDynamicRoutes';

const websiteUrl = process.env.VITE_CLIENT_BASE;

const staticRoutes: Route[] = [
  { url: '/', lastmod: new Date().toISOString() },
  { url: '/about', lastmod: '2025-11-13T00:00:00Z' },
  { url: '/portfolio', lastmod: new Date().toISOString() },
  { url: '/products', lastmod: new Date().toISOString() },
  { url: '/testimonials', lastmod: '2025-11-13T00:00:00Z' },
  { url: '/contact', lastmod: '2025-11-13T00:00:00Z' },
  { url: '/store', lastmod: new Date().toISOString() },
  { url: '/store/checkout', lastmod: '2025-11-13T00:00:00Z' },
];

const generateSitemap = async () => {
  try {
    // Fetch dynamic routes
    const dynamicRoutes: Route[] = await fetchDynamicRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // Create sitemap entries with priority & changefreq
    const routes = createSitemapEntries(allRoutes);

    // Generate sitemap.xml
    const sitemapStream = new SitemapStream({ hostname: websiteUrl });
    routes.forEach((route) => {
      sitemapStream.write(route);
    });
    sitemapStream.end();

    const sitemap = await streamToPromise(sitemapStream);
    const sitemapPath = path.join(process.cwd(), '/public/sitemap.xml');
    writeFileSync(sitemapPath, sitemap.toString());
    console.log('sitemap.xml generated at', sitemapPath);

    // Generate robots.txt
    const robotsTxt = `User-agent: *
Disallow: /admin/
Allow: /
Sitemap: ${websiteUrl}/sitemap.xml`;

    const robotsPath = path.join(process.cwd(), '/public/robots.txt');
    writeFileSync(robotsPath, robotsTxt);
    console.log('robots.txt generated at', robotsPath);
  } catch (error) {
    console.error('Error generating sitemap or robots.txt:', error);
    process.exit(1);
  }
};

// Execute
generateSitemap();
