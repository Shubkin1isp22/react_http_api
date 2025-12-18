
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts, addPost, updatePost, deletePost } from '../../api/api';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPosts();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка при загрузке постов');
    }
  }
);

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (post, { rejectWithValue }) => {
    try {
      const res = await addPost(post);
      return { ...res.data, id: Date.now() }; // временный id
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка при добавлении поста');
    }
  }
);

export const editPost = createAsyncThunk(
  'posts/editPost',
  async ({ id, title, body }, { rejectWithValue }) => {
    try {
      await updatePost(id, { title, body });
      return { id, title, body };
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка при редактировании поста');
    }
  }
);

export const removePost = createAsyncThunk(
  'posts/removePost',
  async (id, { rejectWithValue }) => {
    try {
      await deletePost(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || 'Ошибка при удалении поста');
    }
  }
);