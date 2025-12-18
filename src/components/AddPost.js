import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewPost } from '../redux/thunks/postsThunks';

function AddPost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;

    // Используем thunk 
    dispatch(addNewPost({ title, body }));

    // Очистка полей
    setTitle('');
    setBody('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-add-post">
      <h3>Новый пост</h3>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Содержимое"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit">Добавить пост</button>
    </form>
  );
}

export default AddPost;