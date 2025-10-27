import axios from 'axios';
import { SERVER_BASE } from '../config';

const api = axios.create({
  baseURL: `${SERVER_BASE}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
