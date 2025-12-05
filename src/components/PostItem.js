import React from 'react';

function PostItem({ post, onEdit, onDelete }) {
  return (
    <div className="post-card">
      <h3 className="post-title">{post.title}</h3>
      <p className="post-body">{post.body}</p>
      <button className="edit" onClick={() => onEdit(post)}>Редактировать</button>
      <button className="delete" onClick={() => onDelete(post.id)}>Удалить</button>
    </div>
  );
}

export default PostItem;