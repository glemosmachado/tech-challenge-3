import axios from 'axios';
import { auth } from '../lib/auth';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

http.interceptors.request.use((config) => {
  const role = auth.getRole();
  if (role === 'teacher') {
    config.headers = config.headers || {};
    config.headers['x-user-type'] = 'teacher';
  }
  return config;
});
