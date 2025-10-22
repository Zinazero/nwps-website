import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import providersRoutes from './routes/providers.routes';
import parksRouter from './routes/parks.routes';
import productsRouter from './routes/products.routes';
import contactRouter from './routes/contact.routes';

const app = express();

// Middleware
if (process.env.NODE_ENV !== 'production') {
	app.use(
		cors({
			origin: 'http://localhost:5173',
			credentials: true,
		})
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

if (process.env.NODE_ENV === 'production') {
	const clientDistPath = path.join(__dirname, '../../client/dist');
	app.use(express.static(clientDistPath));

	app.get(/^\/(?!api\/).*/, (req, res) => {
		res.sendFile(path.join(clientDistPath, 'index.html'));
	});
}

export default app;
