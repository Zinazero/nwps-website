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
  const clientDistPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDistPath));

  app.get('*', (req, res) => {
    const requestedPath = path.join(clientDistPath, req.path);

    // Serve prerendered HTML if it exists
    if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isFile()) {
      return res.sendFile(requestedPath);
    }

    const indexHtmlPath = path.join(clientDistPath, req.path, 'index.html');
    // Serve index.html inside a folder if it exists (prerendered route)
    if (fs.existsSync(indexHtmlPath)) {
      return res.sendFile(indexHtmlPath);
    }

    // Otherwise, fallback to SPA index.html
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

export default app;
