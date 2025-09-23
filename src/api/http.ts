import axios from 'axios';
import { auth } from '../lib/auth';

const baseURL = import.meta.env.VITE_API_URL || 'https://tech-challenge-2-d1kb.onrender.com';
console.log('BaseURL efetiva =', baseURL);

export const http = axios.create({ baseURL });

http.interceptors.request.use((config) => {
  const role = auth.getRole();
  if (role === 'teacher') {
    config.headers = config.headers || {};
    config.headers['x-user-type'] = 'teacher';
  }
  return config;
});
