
import React, { useState } from 'react';
import { updatePost } from './api/api';

function EditPost({ post, onUpdate, onCancel }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await updatePost(post.id, { title, body, userId: post.userId });
      onUpdate(response.data); // обновляем пост в родителе
    } catch (error) {
      console.error('Ошибка при обновлении поста:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
      <h3>Редактировать пост</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px', width: '300px' }}
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px', width: '300px', height: '100px' }}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Сохраняем...' : 'Сохранить'}
      </button>
      <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
        Отмена
      </button>
    </form>
  );
}

export default EditPost;