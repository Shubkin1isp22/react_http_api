
import React, { useState } from 'react';
import { api } from './api/api';

function AddPost({ onAdd }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post('/posts', {
        title,
        body,
        userId: 1, // JSONPlaceholder требует userId
      });

      // вызываем callback из родителя, чтобы добавить пост в список
      onAdd(response.data);

      // очищаем форму
      setTitle('');
      setBody('');
    } catch (error) {
      console.error('Ошибка при добавлении поста:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <h2>Добавить новый пост</h2>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px', width: '300px' }}
      />
      <textarea
        placeholder="Текст поста"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        style={{ display: 'block', marginBottom: '10px', width: '300px', height: '100px' }}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Добавление...' : 'Добавить пост'}
      </button>
    </form>
  );
}

export default AddPost;