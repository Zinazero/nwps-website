import express from 'express';
import path from 'path';
import cors from 'cors';
import parksRouter from './routes/parks.routes';
import authRoutes from './routes/auth.routes';
import cookieParser from 'cookie-parser';

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
app.use('/api/parks', parksRouter);
app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === 'production') {
	const clientDistPath = path.join(__dirname, '../../client/dist');
	app.use(express.static(clientDistPath));

	app.get(/^\/(?!api\/).*/, (req, res) => {
		res.sendFile(path.join(clientDistPath, 'index.html'));
	});
}

export default app;
