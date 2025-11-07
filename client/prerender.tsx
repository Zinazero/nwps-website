import fs from 'node:fs';
import path from 'node:path';
import { prerender } from 'react-dom/static';
import App from './src/App';
import { MemoryRouter } from 'react-router-dom';
import 'dotenv/config';
import { AuthProvider } from './src/contexts/AuthContext';
import { ProductsProvider } from './src/contexts/ProductsContext';
import { RecentProjectsProvider } from './src/contexts/RecentProjectsContext';

export const CLIENT_BASE = process.env.VITE_CLIENT_BASE || 'http://localhost:5173';
export const SERVER_BASE = process.env.VITE_SERVER_BASE || 'http://localhost:5004';
export const OPTIMIZER_BASE = process.env.VITE_IMAGE_OPTIMIZER_BASE || 'http://localhost:4000';
export const NODE_ENV = process.env.VITE_NODE_ENV || 'development';

async function streamToString(stream: ReadableStream<Uint8Array>) {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return new TextDecoder().decode(result);
}

const routes = ['/', '/about'];

async function build() {
  for (const route of routes) {
    const { prelude } = await prerender(
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>
          <ProductsProvider>
            <RecentProjectsProvider>
              <App />
            </RecentProjectsProvider>
          </ProductsProvider>
        </AuthProvider>
      </MemoryRouter>,
    );

    const html = await streamToString(prelude); // convert stream -> string

    const outputDir = path.join(process.cwd(), 'dist', route.replace(/^\//, ''));
    fs.mkdirSync(outputDir, { recursive: true });
    fs.writeFileSync(path.join(outputDir, 'index.html'), html);
    console.log(`Prerendered ${route}`);
  }
  console.log('All routes prerendered!');
}

build().catch(console.error);
