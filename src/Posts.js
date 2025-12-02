// Posts.js
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, deletePost, updatePost, api } from './api/api';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import PostsList from './components/PostsList';

function Posts() {
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState(null);

  // GET: все посты
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await getPosts();
      return res.data;
    },
  });

  // MUTATION: удаление поста
  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.filter((post) => post.id !== id)
      );
    },
    onError: (err) => {
      console.error('Ошибка при удалении поста:', err);
      alert('Не удалось удалить пост');
    },
  });

  // MUTATION: обновление поста
  const updateMutation = useMutation({
    mutationFn: ({ id, updatedPost }) => updatePost(id, updatedPost),
    onSuccess: (_, { id, updatedPost }) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.map((post) => (post.id === id ? { ...post, ...updatedPost } : post))
      );
      setEditingPost(null);
    },
    onError: (err) => {
      console.error('Ошибка при обновлении поста:', err);
      alert('Не удалось обновить пост');
    },
  });

  // MUTATION: добавление нового поста
  const addMutation = useMutation({
    mutationFn: (newPost) => api.post('/posts', newPost),
    onSuccess: (res, newPost) => {
      queryClient.setQueryData(['posts'], (oldPosts = []) => [newPost, ...oldPosts]);
    },
    onError: (err) => {
      console.error('Ошибка при добавлении поста:', err);
      alert('Не удалось добавить пост');
    },
  });

  // обработчики
  const handleDeletePost = (id) => deleteMutation.mutate(id);
  const handleUpdatePost = (post) => setEditingPost(post);
  const handleEditSave = (updatedPost) =>
    updateMutation.mutate({ id: updatedPost.id, updatedPost });
  const handleAddPost = (newPost) => {
    const tempId = Date.now(); 
    addMutation.mutate({ ...newPost, id: tempId });
  };

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка при загрузке постов</p>;

  return (
    <div className="container">
      <section className="add-post-section">
        <AddPost onAdd={handleAddPost} />
      </section>

      {editingPost && (
        <EditPost
          post={editingPost}
          onSave={handleEditSave}
          onCancel={() => setEditingPost(null)}
        />
      )}

      <section className="posts-section">
        <h2>Все статьи</h2>
        <PostsList
          posts={posts}
          onEdit={handleUpdatePost}
          onDelete={handleDeletePost}
        />
      </section>
    </div>
  );
}

export default Posts;