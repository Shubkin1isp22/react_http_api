import React, { useState } from 'react';

function AddPost({ onAdd }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;
    onAdd({ title, body, userId: 1 }); // id пользователя можно подставлять динамически
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-add-post">
      <h2>Добавить новую статью</h2>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Текст поста"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit">Добавить пост</button>
    </form>
  );
}

export default AddPost;