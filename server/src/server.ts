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
  app.use(express.static(clientDist, { index: false, redirect: false, extensions: ['html'] }));

  app.get('*', (req, res) => {
    if (isCrawler(req.headers['user-agent'])) {
      // map SPA route to prerendered HTML
      const routePath = req.path.replace(/^\/+/, ''); // removes leading /
      const prerenderFile = path.join(clientDist, 'prerender', routePath, 'index.html');

      res.sendFile(prerenderFile, (err) => {
        if (err) {
          // fallback to SPA if prerender file doesn't exist
          res.sendFile(path.join(clientDist, 'index.html'));
        }
      });
    } else {
      // human user: always serve SPA
      res.sendFile(path.join(clientDist, 'index.html'));
    }
  });
}

export default app;
