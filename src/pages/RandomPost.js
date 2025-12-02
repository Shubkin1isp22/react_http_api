import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/api';

function RandomPost() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['randomPost'],
    queryFn: async () => {
      const res = await getPosts();
      const posts = res.data;
      return posts[Math.floor(Math.random() * posts.length)]; 
    },
  });

  if (isLoading) return <p>Загрузка случайного поста...</p>;
  if (error) return <p>Ошибка загрузки случайного поста</p>;

  return (
    <div className="post-card">
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
}

export default RandomPost;