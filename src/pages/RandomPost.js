import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/api';
import { queryClient } from '../queryClient';

function RandomPost() {
  
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['posts'],
      queryFn: getPosts,
    });
  }, []);

  
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  
  const randomPostQuery = useQuery({
    queryKey: ['randomPost'],
    queryFn: () => {
      const posts = postsQuery.data.data; 
      return posts[Math.floor(Math.random() * posts.length)];
    },
    enabled: !!postsQuery.data, 
  });

  if (postsQuery.isLoading || randomPostQuery.isLoading) return <p>Загрузка случайного поста...</p>;
  if (postsQuery.error || randomPostQuery.error) return <p>Ошибка загрузки случайного поста</p>;

  return (
    <div className="post-card">
      <h3>{randomPostQuery.data.title}</h3>
      <p>{randomPostQuery.data.body}</p>
    </div>
  );
}

export default RandomPost;