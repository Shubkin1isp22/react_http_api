import { createSelector } from '@reduxjs/toolkit';

// Базовый селектор состояния posts
const selectPostsState = (state) => state.posts;

// Мемоизированный селектор всех постов
export const selectAllPosts = createSelector(
  [selectPostsState],
  (postsState) => postsState.posts
);

// Селектор загрузки и ошибки
export const selectPostsLoading = createSelector(
  [selectPostsState],
  (postsState) => postsState.loading
);

export const selectPostsError = createSelector(
  [selectPostsState],
  (postsState) => postsState.error
);


export const selectPostsCount = createSelector(
  [selectAllPosts],
  (posts) => posts.length
);

export const selectPostsByKeyword = (keyword) =>
  createSelector(
    [selectAllPosts],
    (posts) => posts.filter((post) =>
      post.title.toLowerCase().includes(keyword.toLowerCase())
    )
  );