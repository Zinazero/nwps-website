import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ProductsProvider } from './contexts/ProductsContext.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ProductsProvider>
            <App />
          </ProductsProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>,
  );
}
