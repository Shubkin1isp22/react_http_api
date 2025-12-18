
import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts, addNewPost, editPost, removePost } from '../thunks/postsThunks';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
  
    clearPostsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(addNewPost.rejected, (state, action) => {
        state.error = action.error.message;
      })

      
      .addCase(editPost.fulfilled, (state, action) => {
        state.posts = state.posts.map((p) =>
          p.id === action.payload.id ? action.payload : p
        );
      })
      .addCase(editPost.rejected, (state, action) => {
        state.error = action.error.message;
      })

      
      .addCase(removePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((p) => p.id !== action.payload);
      })
      .addCase(removePost.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});


export const { clearPostsError } = postsSlice.actions;

export default postsSlice.reducer;