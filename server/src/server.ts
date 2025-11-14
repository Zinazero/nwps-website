import path from 'node:path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import env from './config/env';
import authRoutes from './routes/auth.routes';
import contactRouter from './routes/contact.routes';
import parksRouter from './routes/parks.routes';
import productsRouter from './routes/products.routes';
import providersRoutes from './routes/providers.routes';
import storeRoutes from './routes/store.routes';
import fs from 'node:fs';

const app = express();

// Middleware
if (env.NODE_ENV !== 'production') {
  app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    }),
  );
}

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/providers', providersRoutes);
app.use('/api/parks', parksRouter);
app.use('/api/products', productsRouter);
app.use('/api/contact', contactRouter);
app.use('/api/store', storeRoutes);

if (env.NODE_ENV === 'production') {
  const clientDist = path.join(__dirname, '../../client/dist');

  const crawlerUserAgents = [
    /Googlebot/i,
    /Bingbot/i,
    /Slurp/i,
    /DuckDuckBot/i,
    /Baiduspider/i,
    /YandexBot/i,
  ];

  function isCrawler(userAgent?: string) {
    if (!userAgent) return false;
    return crawlerUserAgents.some((crawler) => crawler.test(userAgent));
  }

  // Only serve JS/CSS/images from clientDist
  const prerenderPath = path.join(clientDist, 'prerender');

  app.get('*', (req, res) => {
    const routePath = req.path.replace(/^\/+/, ''); // remove leading slash
    const prerenderFile = path.join(prerenderPath, routePath, 'index.html');

    // Check if prerendered file exists
    fs.access(prerenderFile, fs.constants.F_OK, (err) => {
      if (!err) {
        // Serve prerendered HTML to everyone (or optionally only crawlers)
        res.sendFile(prerenderFile);
      } else {
        // Fallback: serve SPA index.html with embedded __PRERENDER_DATA__
        res.sendFile(path.join(clientDist, 'index.html'));
      }
    });
  });
}

export default app;
