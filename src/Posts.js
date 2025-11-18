// src/Posts.js
import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from './api/api';
import AddPost from './AddPost';
import EditPost from './EditPost';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    getPosts().then(response => {
      setPosts(response.data);
      setLoading(false);
    });
  }, []);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(p => (p.id === updatedPost.id ? { ...p, ...updatedPost } : p)));
    setEditingPost(null);
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id); // отправляем DELETE-запрос
      // обновляем фронтенд
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении поста:', error);
    }
  };

  if (loading) return <p>Загрузка...</p>;

  return (
    <div>
      <AddPost onAdd={handleAddPost} />

      {editingPost && (
        <EditPost
          post={editingPost}
          onUpdate={handleUpdatePost}
          onCancel={() => setEditingPost(null)}
        />
      )}

      <h1>Список постов</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id} style={{ marginBottom: '15px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
            <button onClick={() => setEditingPost(post)}>Редактировать</button>
            <button onClick={() => handleDeletePost(post.id)} style={{ marginLeft: '10px' }}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Posts;