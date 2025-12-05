import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../api/api';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => (await getUsers()).data,
  });
};