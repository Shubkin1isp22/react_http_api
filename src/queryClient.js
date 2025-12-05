import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, 
      cacheTime: 1000 * 60 * 5, // 5 минут
      retry: 2, 
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), 
      onError: (error) => {
        console.error('Глобальная ошибка запроса:', error);
        
      },
    },
    mutations: {
      retry: 1, 
      onError: (error) => {
        console.error('Глобальная ошибка мутации:', error);
        
      },
    },
  },
});