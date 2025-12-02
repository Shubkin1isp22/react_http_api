
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/api';
import '../App.css'; // используем стили из твоего проекта

function SearchPosts() {
  const [search, setSearch] = useState('');

  
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await getPosts();
      return res.data;
    },
  });

  if (isLoading) return <p>Загрузка постов...</p>;
  if (error) return <p>Ошибка загрузки постов</p>;

  // Фильтруем по заголовку и тексту
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header className="blog-header">
        <h1>Поиск статей</h1>
        <p className="subtitle">Введите слово или фразу для поиска по заголовкам и тексту постов</p>
      </header>

      <div className="form-add-post">
        <input
          type="text"
          placeholder="Поиск..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '8px', border: '1px solid #d1d5db' }}
        />
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
          </div>
        ))
      ) : (
        <p>Посты не найдены</p>
      )}
    </div>
  );
}

export default SearchPosts;