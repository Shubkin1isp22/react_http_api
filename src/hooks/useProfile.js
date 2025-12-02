import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../api/api';

export const useProfile = (userId) => {
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: async () => (await getProfile(userId)).data,
    enabled: !!userId, // только если userId задан
  });
};