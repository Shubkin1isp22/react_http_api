import React, { useState } from 'react';

function EditPost({ post, onSave, onCancel }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...post, title, body });
  };

  return (
    <form onSubmit={handleSubmit} className="form-edit-post">
      <h3>Редактировать пост</h3>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit">Сохранить</button>
      <button type="button" onClick={onCancel}>Отмена</button>
    </form>
  );
}

export default EditPost;