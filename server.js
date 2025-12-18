
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5001;

const fs = require('fs');
const postsFile = path.join(__dirname, 'posts.json');

// Чтение постов из файла
const readPosts = () => {
  const data = fs.readFileSync(postsFile, 'utf-8');
  return JSON.parse(data);
};

// Запись постов в файл
const writePosts = (posts) => {
  fs.writeFileSync(postsFile, JSON.stringify(posts, null, 2), 'utf-8');
};

// Мидлвары
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build'))); // React build

// --- API Routes ---

// Получить все посты
app.get('/api/posts', (req, res) => {
  const posts = readPosts();
  res.json(posts);
});

// Добавить пост
app.post('/api/posts', (req, res) => {
  const posts = readPosts();
  const { title, body } = req.body;
  const newPost = { id: Date.now(), title, body };
  posts.unshift(newPost);
  writePosts(posts);
  res.status(201).json(newPost);
});

// Обновить пост
app.put('/api/posts/:id', (req, res) => {
  const posts = readPosts();
  const { id } = req.params;
  const { title, body } = req.body;

  const index = posts.findIndex(p => p.id == id);
  if (index === -1) return res.status(404).json({ message: 'Пост не найден' });

  posts[index] = { ...posts[index], title, body };
  writePosts(posts);
  res.json(posts[index]);
});
// Удалить пост
app.delete('/api/posts/:id', (req, res) => {
  let posts = readPosts();
  const { id } = req.params;
  posts = posts.filter(p => p.id != id);
  writePosts(posts);
  res.status(204).send();
});

// --- Обслуживание React ---
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// --- Запуск сервера ---
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});