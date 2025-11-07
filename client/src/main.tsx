import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/sections.css';
import './styles/hotspots.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import { ProductsProvider } from './contexts/ProductsContext.tsx';
import { RecentProjectsProvider } from './contexts/RecentProjectsContext.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ProductsProvider>
            <RecentProjectsProvider>
              <App />
            </RecentProjectsProvider>
          </ProductsProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>,
  );
}
