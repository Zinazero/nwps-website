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

if (env.NODE_ENV === 'production') {
  const clientDistPath = path.join(__dirname, '../../client/dist');
  app.use(express.static(clientDistPath));

  app.get(/^\/(?!api\/).*/, (_req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

export default app;
