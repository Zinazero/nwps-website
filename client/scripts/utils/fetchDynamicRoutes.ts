import axios from 'axios';
import { Route } from '../types';

export const fetchDynamicRoutes = async (): Promise<Route[]> => {
  const SERVER_BASE = process.env.VITE_SERVER_BASE;

  const productsRes = await axios.get<Route[]>(`${SERVER_BASE}/api/products/sitemap`);
  const productRoutes: Route[] = productsRes.data;

  const parksRes = await axios.get<Route[]>(`${SERVER_BASE}/api/parks/sitemap`);
  const parkRoutes: Route[] = parksRes.data;

  const providersRes = await axios.get<Route[]>(`${SERVER_BASE}/api/providers/sitemap`);
  const providerRoutes: Route[] = providersRes.data;

  return [...productRoutes, ...parkRoutes, ...providerRoutes];
};
