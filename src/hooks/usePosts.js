import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, addPost, updatePost, deletePost } from '../api/api';

export const usePosts = () => {
  const queryClient = useQueryClient();

  
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => (await getPosts()).data,
    staleTime: 1000 * 60, // 1 минута
    refetchInterval: 1000 * 60, 
  });

  
  const addPostMutation = useMutation({
    mutationFn: async (newPost) => (await addPost(newPost)).data,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries(['posts']);
      const previousPosts = queryClient.getQueryData(['posts']) || [];
      queryClient.setQueryData(['posts'], (old = []) => [
        { ...newPost, id: Date.now() },
        ...old,
      ]);
      return { previousPosts };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
      alert('Ошибка при добавлении поста');
    },
    
  });

  // Редактирование поста
  const updatePostMutation = useMutation({
    mutationFn: async ({ id, data }) => (await updatePost(id, data)).data,
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries(['posts']);
      const previousPosts = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.map((post) => (post.id === id ? { ...post, ...data } : post))
      );
      return { previousPosts };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
      alert('Ошибка при обновлении поста');
    },
  });

  // Удаление поста
  const deletePostMutation = useMutation({
    mutationFn: async (id) => {
      await deletePost(id);
      return id;
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries(['posts']);
      const previousPosts = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.filter((post) => post.id !== id)
      );
      return { previousPosts };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
      alert('Ошибка при удалении поста');
    },
  });

  return { postsQuery, addPostMutation, updatePostMutation, deletePostMutation };
};