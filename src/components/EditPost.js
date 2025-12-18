// src/components/EditPost.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateEditingTitle,
  updateEditingBody,
  clearEditingPost,
} from '../redux/slices/editorSlice';
import { closeModal } from '../redux/slices/uiSlice';
import { editPost } from '../redux/thunks/postsThunks';

function EditPost() {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.editor.editingPost);

  if (!post) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Отправка редактированного поста через thunk
    dispatch(editPost({ id: post.id, title: post.title, body: post.body }));

    
    dispatch(clearEditingPost());
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(clearEditingPost());
    dispatch(closeModal());
  };

  return (
    <form onSubmit={handleSubmit} className="form-edit-post">
      <h3>Редактировать пост</h3>

      <input
        type="text"
        value={post.title}
        onChange={(e) => dispatch(updateEditingTitle(e.target.value))}
        required
      />

      <textarea
        value={post.body}
        onChange={(e) => dispatch(updateEditingBody(e.target.value))}
        required
      />

      <button type="submit">Сохранить</button>
      <button type="button" onClick={handleCancel}>Отмена</button>
    </form>
  );
}

export default EditPost;