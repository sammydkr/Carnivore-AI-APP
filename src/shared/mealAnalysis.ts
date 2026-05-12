import type { MealAnalysisResult } from './types';

interface MacroEstimate {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

const emptyEstimate: MacroEstimate = {
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
};

const avoidKeywords = [
  'bread',
  'rice',
  'pasta',
  'sugar',
  'fries',
  'potato',
  'canola',
  'soybean oil',
  'seed oil',
];

export function createMockMealAnalysis(mealDetails: string): MealAnalysisResult {
  const normalizedDetails = mealDetails.toLowerCase();
  const macros = estimateMacros(normalizedDetails);
  const avoidFoods = avoidKeywords.filter((keyword) =>
    normalizedDetails.includes(keyword),
  );

  const isFriendly = avoidFoods.length === 0 && macros.carbs <= 10;

  return {
    verdict: isFriendly
      ? 'Keto/carnivore-friendly estimate'
      : 'Needs review for keto/carnivore goals',
    calories: macros.calories,
    protein: macros.protein,
    fat: macros.fat,
    carbs: macros.carbs,
    message: isFriendly
      ? 'This meal looks focused on real food, protein, and low carbohydrates.'
      : 'This meal may include foods that can raise carbs or work against ketosis.',
    avoidFoods,
    wholeFoodTip:
      'Focus on whole foods like steak, eggs, fish, chicken, butter, and simple low-carb sides.',
    ketoneNote:
      'Ketones usually rise when carbs stay low and meals are built around protein and healthy fats.',
  };
}

function estimateMacros(details: string): MacroEstimate {
  const estimate = { ...emptyEstimate };

  addGramFood(estimate, details, ['steak', 'beef', 'meat'], {
    calories: 250,
    protein: 26,
    fat: 17,
    carbs: 0,
  });
  addGramFood(estimate, details, ['butter'], {
    calories: 717,
    protein: 1,
    fat: 81,
    carbs: 0,
  });
  addGramFood(estimate, details, ['fish', 'salmon'], {
    calories: 208,
    protein: 22,
    fat: 13,
    carbs: 0,
  });
  addGramFood(estimate, details, ['chicken'], {
    calories: 165,
    protein: 31,
    fat: 4,
    carbs: 0,
  });
  addEggs(estimate, details);

  if (estimate.calories === 0) {
    return {
      calories: 650,
      protein: 45,
      fat: 48,
      carbs: 6,
    };
  }

  return roundEstimate(estimate);
}

function addGramFood(
  estimate: MacroEstimate,
  details: string,
  keywords: string[],
  per100g: MacroEstimate,
) {
  const matchesFood = keywords.some((keyword) => details.includes(keyword));

  if (!matchesFood) {
    return;
  }

  const grams = extractGramsBeforeKeywords(details, keywords);
  const multiplier = grams / 100;
  estimate.calories += per100g.calories * multiplier;
  estimate.protein += per100g.protein * multiplier;
  estimate.fat += per100g.fat * multiplier;
  estimate.carbs += per100g.carbs * multiplier;
}

function addEggs(estimate: MacroEstimate, details: string) {
  if (!details.includes('egg')) {
    return;
  }

  const eggMatch = details.match(/(\d+)\s*(large\s*)?eggs?/);
  const eggCount = eggMatch ? Number(eggMatch[1]) : 2;
  estimate.calories += eggCount * 72;
  estimate.protein += eggCount * 6;
  estimate.fat += eggCount * 5;
  estimate.carbs += eggCount * 0.5;
}

function extractGramsBeforeKeywords(details: string, keywords: string[]) {
  for (const keyword of keywords) {
    const match = details.match(new RegExp(`(\\d+)\\s*g(?:r|ram|rams)?\\s+${keyword}`));

    if (match) {
      return Number(match[1]);
    }
  }

  return 100;
}

function roundEstimate(estimate: MacroEstimate): MacroEstimate {
  return {
    calories: Math.round(estimate.calories),
    protein: Math.round(estimate.protein),
    fat: Math.round(estimate.fat),
    carbs: Math.round(estimate.carbs),
  };
}
