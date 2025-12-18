import axios from 'axios';

const API_URL = 'http://localhost:5001/api/posts'; // локальный api

export const getPosts = async () => await axios.get(API_URL);
export const addPost = async (post) => await axios.post(API_URL, post);
export const updatePost = async (id, data) => await axios.put(`${API_URL}/${id}`, data);
export const deletePost = async (id) => await axios.delete(`${API_URL}/${id}`);