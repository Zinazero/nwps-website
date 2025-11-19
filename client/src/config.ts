export const MODE = import.meta.env.MODE;
export const CLIENT_BASE = import.meta.env.VITE_CLIENT_BASE || 'http://localhost:5173';
export const SERVER_BASE = import.meta.env.VITE_SERVER_BASE || 'http://localhost:5004';
export const OPTIMIZER_BASE = import.meta.env.VITE_IMAGE_OPTIMIZER_BASE || 'http://localhost:4000';
export const STORE_ENABLED = import.meta.env.VITE_STORE_ENABLED === 'true';
