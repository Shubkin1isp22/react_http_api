import React, { useEffect, useState } from 'react';
import { getPosts, deletePost } from './api/api';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import PostsList from './components/PostsList';
import './App.css';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    getPosts().then(res => {
      setPosts(res.data);
      setLoading(false);
    });
  }, []);

  const handleAddPost = (newPost) => setPosts([newPost, ...posts]);
  const handleUpdatePost = (updatedPost) => {
    setPosts(posts.map(p => (p.id === updatedPost.id ? { ...p, ...updatedPost } : p)));
    setEditingPost(null);
  };
  const handleDeletePost = async (id) => {
    await deletePost(id);
    setPosts(posts.filter(p => p.id !== id));
  };

  if (loading) return <p>Загрузка...</p>;

  return (
  <div className="container">

    {/* Герой-блок / заголовок */}
    <header className="blog-header">
      <h1>Блог языковой школы “LinguaPro”</h1>
      <p className="subtitle">
        Полезные статьи, советы по изучению языков и материалы для практики 🇪🇸🇬🇧🇩🇪
      </p>
    </header>

    {/* Форма добавления поста */}
    <section className="add-post-section">
      <AddPost onAdd={handleAddPost} />
    </section>

    {/* Форма редактирования */}
    {editingPost && (
      <EditPost
        post={editingPost}
        onUpdate={handleUpdatePost}
        onCancel={() => setEditingPost(null)}
      />
    )}

    
    <section className="posts-section">
      <h2>Все статьи</h2>
      <PostsList
        posts={posts}
        onEdit={setEditingPost}
        onDelete={handleDeletePost}
      />
    </section>
  </div>
);
}

export default Posts;