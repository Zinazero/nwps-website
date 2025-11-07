const viteEnv =
  typeof import.meta !== 'undefined' && import.meta.env
    ? import.meta.env
    : (process.env as Record<string, string | undefined>);

export const CLIENT_BASE = viteEnv.VITE_CLIENT_BASE || 'http://localhost:5173';
export const SERVER_BASE = viteEnv.VITE_SERVER_BASE || 'http://localhost:5004';
export const OPTIMIZER_BASE = viteEnv.VITE_IMAGE_OPTIMIZER_BASE || 'http://localhost:4000';
export const NODE_ENV = viteEnv.VITE_NODE_ENV || 'development';

console.log('Reading SERVER_BASE from config:', process.env.VITE_SERVER_BASE);
