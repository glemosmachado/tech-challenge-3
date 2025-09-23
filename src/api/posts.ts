import { http } from './http';
import type { Post } from '../types/post';

export const PostsApi = {
  list(): Promise<Post[]> {
    return http.get('/posts').then(r => r.data);
  },
  get(id: string): Promise<Post> {
    return http.get(`/posts/${id}`).then(r => r.data);
  },
  search(query: string): Promise<Post[]> {
    return http.get('/posts/search', { params: { query } }).then(r => r.data);
  },
  create(data: Omit<Post, '_id'>): Promise<Post> {
    return http.post('/posts', data).then(r => r.data);
  },
  update(id: string, data: Partial<Omit<Post, '_id'>>): Promise<Post> {
    return http.put(`/posts/${id}`, data).then(r => r.data);
  },
  remove(id: string): Promise<{ message: string }> {
    return http.delete(`/posts/${id}`).then(r => r.data);
  }
};