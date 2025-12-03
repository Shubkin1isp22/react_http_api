import React from 'react';

function PostsList({ posts, onEdit, onDelete }) {
  if (!posts || posts.length === 0) return <p>Нет постов</p>;

  return (
    <div className="posts-list">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-body">{post.body}</p>
          <div className="post-actions">
            <button className="edit" onClick={() => onEdit(post)}>Редактировать</button>
            <button className="delete" onClick={() => onDelete(post.id)}>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;