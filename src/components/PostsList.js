import React from 'react';
import PostItem from './PostItem';

function PostsList({ posts, onEdit, onDelete }) {
  return (
    <div>
      {posts.map(post => (
        <PostItem key={post.id} post={post} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default PostsList;