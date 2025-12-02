import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost } from '../api/api';

function AddPost({ onAdd }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (res) => {
      onAdd({ id: Math.random(), title: res.data.title || title, body: res.data.body || body });
      setTitle('');
      setBody('');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title, body, userId: 1 });
  };

  return (
    <form onSubmit={handleSubmit} className="form-add-post">
      <h2>Добавить новую статью</h2>
      <input className="input-post" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Заголовок" />
      <textarea className="textarea-post" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Текст поста" />
      <button className="add" type="submit" disabled={mutation.isLoading}>
        {mutation.isLoading ? 'Добавление...' : 'Добавить пост'}
      </button>
    </form>
  );
}

export default AddPost;