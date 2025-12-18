
import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './slices/editorSlice';
import uiReducer from './slices/uiSlice';
import searchReducer from './slices/searchSlice';
import postsReducer from './slices/postsSlice';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    ui: uiReducer,
    search: searchReducer,
    posts: postsReducer,
  },
  devTools: true, 
});
