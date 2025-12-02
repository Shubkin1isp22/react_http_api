import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPosts, addPost, updatePost, deletePost } from '../api/api';

export const usePosts = () => {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: async () => (await getPosts()).data,
  });

  const addPostMutation = useMutation({
    mutationFn: addPost,
    onSuccess: (res, newPost) => {
      queryClient.setQueryData(['posts'], (oldPosts = []) => [res.data, ...oldPosts]);
    },
  });

  const updatePostMutation = useMutation({
    mutationFn: ({ id, data }) => updatePost(id, data),
    onSuccess: (_, { id, data }) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.map((post) => (post.id === id ? { ...post, ...data } : post))
      );
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['posts'], (oldPosts) =>
        oldPosts.filter((post) => post.id !== id)
      );
    },
  });

  return {
    postsQuery,
    addPostMutation,
    updatePostMutation,
    deletePostMutation,
  };
};