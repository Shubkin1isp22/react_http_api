import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

export const getPosts = () => api.get('/posts');
export const updatePost = (id, data) => api.put(`/posts/${id}`, data); 
export const deletePost = (id) => api.delete(`/posts/${id}`);
export const addPost = (data) => api.post('/posts', data);

export const getUsers = () => api.get('/users');
export const getProfile = (userId) => api.get(`/users/${userId}`);