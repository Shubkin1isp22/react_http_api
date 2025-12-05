import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/api';
import '../App.css';

function SearchPosts() {
  const [search, setSearch] = useState('');

  const { data: filteredPosts = [], isLoading, error } = useQuery({
    queryKey: ['posts'], 
    queryFn: getPosts,    
    staleTime: 1000 * 60, // 1 минута
    select: (res) => {
      if (!search) return [];
      return res.data.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.body.toLowerCase().includes(search.toLowerCase())
      );
    },
    enabled: search.length > 0, // выполняем только если есть текст поиска
  });

  if (isLoading) return <p>Загрузка постов...</p>;
  if (error) return <p>Ошибка загрузки постов</p>;

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
        search.length > 0 && <p>Посты не найдены</p>
      )}
    </div>
  );
}

export default SearchPosts;