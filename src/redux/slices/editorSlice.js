import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  editingPost: null,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setEditingPost: (state, action) => {
      state.editingPost = { ...action.payload };
    },
    clearEditingPost: (state) => {
      state.editingPost = null;
    },
    updateEditingTitle: (state, action) => {
      if (state.editingPost) state.editingPost.title = action.payload;
    },
    updateEditingBody: (state, action) => {
      if (state.editingPost) state.editingPost.body = action.payload;
    },
  },
});

export const { setEditingPost, clearEditingPost, updateEditingTitle, updateEditingBody } = editorSlice.actions;

export default editorSlice.reducer;