import React, { useState } from 'react';
import { usePosts } from './hooks/usePosts';
import AddPost from './components/AddPost';
import EditPost from './components/EditPost';
import PostsList from './components/PostsList';

function Posts() {
  const { postsQuery, addPostMutation, updatePostMutation, deletePostMutation } = usePosts();
  const [editingPost, setEditingPost] = useState(null);

  const handleAddPost = (newPost) => {
    const tempId = Date.now();
    addPostMutation.mutate({ ...newPost, id: tempId });
  };

  const handleEditPost = (post) => setEditingPost(post);

  const handleSaveEdit = (updatedPost) => {
    updatePostMutation.mutate({ id: updatedPost.id, data: updatedPost });
    setEditingPost(null);
  };

  const handleCancelEdit = () => setEditingPost(null);

  const handleDeletePost = (id) => deletePostMutation.mutate(id);

  if (postsQuery.isLoading) return <p>Загрузка постов...</p>;
  if (postsQuery.isError) return <p>Ошибка загрузки постов</p>;

  return (
    <div className="container">
      <AddPost onAdd={handleAddPost} />

      {editingPost && (
        <EditPost
          post={editingPost}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}

      <PostsList
        posts={postsQuery.data}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
    </div>
  );
}

export default Posts;