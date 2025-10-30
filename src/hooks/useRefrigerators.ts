import { useQuery } from '@tanstack/react-query';
import type { RefrigeratorData } from '@/types/refrigerator.types';
import refrigeratorData from '@/data/samsung-refrigerators.json';

export const useRefrigerators = () => {
  return useQuery<RefrigeratorData>({
    queryKey: ['refrigerators'],
    queryFn: async () => {
      console.log('Loading refrigerator data...', refrigeratorData);
      // Simulate async data loading (trong thực tế có thể là API call)
      const data = refrigeratorData as RefrigeratorData;
      console.log('Data loaded:', data);
      return data;
    },
    staleTime: Infinity, // Data không đổi trong session
  });
};

export const useRefrigeratorsByCategory = (categoryId?: string) => {
  const { data, ...rest } = useRefrigerators();
  
  if (!categoryId) return { data, ...rest };
  
  const category = data?.categories.find(cat => cat.id === categoryId);
  return { 
    data: category, 
    ...rest 
  };
};
