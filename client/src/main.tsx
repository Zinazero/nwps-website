import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChevronUp, faChevronRight, faChevronDown, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter } from 'react-router-dom';

library.add(faChevronUp, faChevronRight, faChevronDown, faChevronLeft);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>
);
