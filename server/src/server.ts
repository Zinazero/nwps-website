import path from 'node:path';
import fs from 'node:fs';
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
  const prerenderPath = path.join(clientDist, 'prerender');

  // Serve static assets (JS, CSS, images)
  app.use(express.static(clientDist, { extensions: ['html'] }));

  app.get('*', (req, res) => {
    const ua = req.headers['user-agent']?.toLowerCase() || '';

    const isCrawler =
      ua.includes('googlebot') ||
      ua.includes('bingbot') ||
      ua.includes('slurp') ||
      ua.includes('duckduckbot') ||
      ua.includes('baiduspider') ||
      ua.includes('yandex') ||
      ua.includes('sogou');

    // Serve prerendered HTML **only to crawlers**
    if (isCrawler) {
      const cleanPath = req.path.replace(/\/$/, '');
      const prerenderFile = path.join(prerenderPath, ...cleanPath.split('/'), 'index.html');

      if (fs.existsSync(prerenderFile)) {
        return res.sendFile(prerenderFile);
      }
    }

    // Humans always get SPA index.html
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

export default app;
