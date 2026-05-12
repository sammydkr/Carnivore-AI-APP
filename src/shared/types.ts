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
  avoidFoods: string[];
  wholeFoodTip: string;
  ketoneNote: string;
}
