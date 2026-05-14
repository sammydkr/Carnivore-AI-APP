import AsyncStorage from '@react-native-async-storage/async-storage';

import type { SavedMealEntry } from './types';

const mealHistoryStorageKey = 'ketovore-ai:meal-history:v1';
const maxSavedMeals = 50;

export async function loadMealHistory(): Promise<SavedMealEntry[]> {
  const rawHistory = await AsyncStorage.getItem(mealHistoryStorageKey);

  if (!rawHistory) {
    return [];
  }

  const parsedHistory = JSON.parse(rawHistory);

  if (!Array.isArray(parsedHistory)) {
    return [];
  }

  return parsedHistory.filter(isSavedMealEntry).slice(0, maxSavedMeals);
}

export async function saveMealHistory(meals: SavedMealEntry[]) {
  const trimmedMeals = meals.slice(0, maxSavedMeals);
  await AsyncStorage.setItem(mealHistoryStorageKey, JSON.stringify(trimmedMeals));
}

export async function clearMealHistory() {
  await AsyncStorage.removeItem(mealHistoryStorageKey);
}

export function createSavedMealEntry({
  analysis,
  imageUri,
  mealDetails,
}: Omit<SavedMealEntry, 'createdAt' | 'id'>): SavedMealEntry {
  return {
    analysis,
    createdAt: new Date().toISOString(),
    id: `${Date.now()}`,
    imageUri,
    mealDetails,
  };
}

function isSavedMealEntry(value: unknown): value is SavedMealEntry {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const entry = value as SavedMealEntry;
  return (
    typeof entry.id === 'string' &&
    typeof entry.createdAt === 'string' &&
    typeof entry.mealDetails === 'string' &&
    Boolean(entry.analysis) &&
    typeof entry.analysis.calories === 'number'
  );
}
