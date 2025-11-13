export type Route = {
  url: string;
  lastmod: string;
};

export interface SitemapEntry extends Route {
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}
