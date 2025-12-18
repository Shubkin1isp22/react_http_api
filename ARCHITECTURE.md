# Архитектура проекта

Проект построен по принципу **type-based architecture** — файлы распределяются по типу (компоненты, страницы, API, Redux, хуки и т.д.).  
Подход выбран потому, что он максимально удобен для небольших и учебных проектов, где важна простота навигации и разделения логики.

---

## 📁 Структура проекта
```
src/
│
├── api/               # Работа с API
│   └── api.js
│
├── components/        # Переиспользуемые UI-компоненты
│   ├── AddPost.js
│   ├── EditPost.js
│   ├── PostItem.js
│   └── PostsList.js
│
├── hooks/             # Кастомные React hooks
│   ├── usePosts.js
│   ├── useUsers.js
│   └── useProfile.js
│
├── pages/             # Страницы под роутер
│   ├── Posts/
│   │   ├── Posts.js
│   │   └── usePost.js
│   ├── AboutPage.js
│   ├── ContactsPage.js
│   ├── SearchPosts.js
│   └── RandomPost.js
│
├── redux/
│   ├── store.js               # Корневой Redux store
│   │
│   ├── slices/                # Синхронные части state
│   │   ├── postsSlice.js
│   │   ├── editorSlice.js
│   │   ├── uiSlice.js
│   │   └── searchSlice.js
│   │
│   ├── thunks/                # Асинхронная логика (createAsyncThunk)
│   │   └── postsThunks.js
│   │
│   └── selectors/             # Мемоизированные селекторы
│       └── postsSelectors.js
│
├── queryClient.js     # Настройка React Query (оставлено для возможной интеграции)
│
├── App.js
├── index.js
└── index.css
```
---

## 🧱 Архитектурный подход

### Почему type-based?
✔ Легко ориентироваться  
✔ Все файлы одного типа в одном месте  
✔ Удобно для новичков  
✔ Хорошо работает с React + Redux Toolkit  
✔ Повышает читаемость кода

---

# 🔄 Правила импортов

### 1. Компоненты импортируются из `/components`
```js
import PostsList from '../components/PostsList';
```
### 2. Redux:
	•	Slice → из /redux/slices
	•	Thunk → из /redux/thunks
	•	Selectors → из /redux/selectors
```
import { fetchPosts } from '../../redux/thunks/postsThunks';
import { selectAllPosts } from '../../redux/selectors/postsSelectors';
```
### 3. API:
```
import api from '../api/api';
```
## 📐 Naming Conventions (правила именования)

### Файлы:
	•	Компоненты: PascalCase.js (AddPost.js)
	•	Redux slice: nameSlice.js
	•	Thunk файлы: nameThunks.js
	•	Селекторы: featureSelectors.js
	•	Хуки: useSomething.js

### Функции:
	•	Redux actions: setSomething, clearSomething
	•	Thunks: fetchPosts, addNewPost
	•	Селекторы: selectPosts, selectPostsCount

### 🧬 Примеры кода слоёв

##### Slice (postsSlice)
```
addCase(fetchPosts.fulfilled, (state, action) => {
  state.posts = action.payload;
});
```
##### Thunk
```
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const res = await api.get('/posts');
    return res.data;
  }
);
```
##### Selector
```
export const selectPostsCount = createSelector(
  [selectAllPosts],
  (posts) => posts.length
);
```
##### Компонент
```
const posts = useSelector(selectAllPosts);
```
## Заключение
Архитектура минималистичная, читаемая, обучающая и полностью соответствует лучшим практикам React + Redux Toolkit.
Проект легко расширять, дополнять и масштабировать.