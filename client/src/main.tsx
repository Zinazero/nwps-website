import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ProductsProvider } from './contexts/ProductsContext.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<ProductsProvider>
					<App />
				</ProductsProvider>
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
