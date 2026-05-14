export type Screen = 'home' | 'scan' | 'tracker' | 'coach' | 'settings';

export interface MealAnalysisResult {
  verdict: string;
  score: number;
  scoreDisplay: string;
  scoreLabel: string;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  message: string;
  recognizedFoods: string[];
  unrecognizedItems: string[];
  avoidFoods: string[];
  wholeFoodTip: string;
  ketoneNote: string;
  dataQualityNote: string;
}

export interface SavedMealEntry {
  id: string;
  createdAt: string;
  imageUri: string | null;
  mealDetails: string;
  analysis: MealAnalysisResult;
}
