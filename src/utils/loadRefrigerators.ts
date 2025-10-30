// Test utility để load data
import type { RefrigeratorData } from '@/types/refrigerator.types';

export const loadRefrigerators = async (): Promise<RefrigeratorData> => {
  try {
    const response = await fetch('/src/data/samsung-refrigerators.json');
    if (!response.ok) {
      throw new Error('Failed to load refrigerator data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading refrigerators:', error);
    throw error;
  }
};
