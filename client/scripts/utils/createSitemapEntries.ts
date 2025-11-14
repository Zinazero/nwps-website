import { Route, SitemapEntry } from '../types';

export const createSitemapEntries = (routes: Route[]): SitemapEntry[] => {
  return routes.map((route) => {
    let priority = 0.5;
    let changefreq: SitemapEntry['changefreq'] = 'monthly';

    if (route.url === '/') {
      priority = 1.0;
      changefreq = 'monthly';
    } else if (route.url === '/store') {
      priority = 0.9;
      changefreq = 'monthly';
    } else if (route.url.startsWith('/products')) {
      priority = 0.8;
      changefreq = 'yearly';
    } else if (route.url.startsWith('/portfolio')) {
      priority = 0.7;
      changefreq = 'monthly';
    } else if (route.url.startsWith('/providers')) {
      priority = 0.6;
      changefreq = 'yearly';
    } else if (route.url === '/about' || route.url === '/testimonials' || route.url === '/contact') {
      priority = 0.5;
      changefreq = 'yearly';
    } else if (route.url === '/store/checkout') {
      priority = 0.4;
      changefreq = 'never';
    }

    return { url: route.url, changefreq, priority, lastmod: route.lastmod };
  });
};
