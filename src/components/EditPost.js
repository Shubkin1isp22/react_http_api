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
      <input className="input-post" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="textarea-post" value={body} onChange={(e) => setBody(e.target.value)} />
      <button className="edit" type="submit">Сохранить</button>
      <button className="delete" type="button" onClick={onCancel}>Отмена</button>
    </form>
  );
}

export default EditPost;