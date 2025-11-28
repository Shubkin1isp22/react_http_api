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
      <h1>Посты сообщества:</h1>
      <AddPost onAdd={handleAddPost} />
      {editingPost && (
        <EditPost
          post={editingPost}
          onUpdate={handleUpdatePost}
          onCancel={() => setEditingPost(null)}
        />
      )}
      <PostsList posts={posts} onEdit={setEditingPost} onDelete={handleDeletePost} />
    </div>
  );
}

export default Posts;