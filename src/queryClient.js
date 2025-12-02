// src/queryClient.js
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, 
      cacheTime: 1000 * 60 * 5, 
      retry: 1, // количество повторных запросов при ошибке
      refetchOnWindowFocus: false, // отключаем автообновление при фокусе
    },
  },
});