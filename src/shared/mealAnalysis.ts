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

const dirtyThirtyIngredients = [
  {
    label: 'High-fructose corn syrup',
    keywords: ['high-fructose corn syrup', 'hfcs'],
  },
  { label: 'Maltodextrin', keywords: ['maltodextrin'] },
  { label: 'GMOs', keywords: ['gmo', 'gmos', 'genetically modified'] },
  { label: 'Sugar', keywords: ['sugar'] },
  { label: 'Dextrose', keywords: ['dextrose'] },
  { label: 'Cornstarch', keywords: ['cornstarch', 'corn starch'] },
  { label: 'Titanium dioxide', keywords: ['titanium dioxide'] },
  {
    label: 'Artificial sweeteners',
    keywords: ['artificial sweetener', 'aspartame', 'sucralose', 'acesulfame'],
  },
  {
    label: 'Ultra-processed seed oils',
    keywords: ['seed oil', 'seed oils', 'canola oil', 'vegetable oil'],
  },
  { label: 'Farmed fish oil', keywords: ['farmed fish oil'] },
  { label: 'Soybean oil', keywords: ['soybean oil'] },
  { label: 'Gluten', keywords: ['gluten'] },
  { label: 'Synthetic vitamins', keywords: ['synthetic vitamin'] },
  {
    label: 'Synthetic food coloring',
    keywords: ['synthetic food coloring', 'artificial color', 'food coloring'],
  },
  {
    label: 'Synthetic preservatives',
    keywords: ['synthetic preservative', 'artificial preservative'],
  },
  { label: 'Artificial flavoring', keywords: ['artificial flavor'] },
  { label: 'Sulfates', keywords: ['sulfate', 'sulfates'] },
  { label: 'Parabens', keywords: ['paraben', 'parabens'] },
  { label: 'Silicones', keywords: ['silicone', 'silicones'] },
  { label: 'Phthalates', keywords: ['phthalate', 'phthalates'] },
  { label: 'Petroleum', keywords: ['petroleum'] },
  { label: 'Dyes', keywords: ['dye', 'dyes'] },
  { label: 'Magnesium silicate', keywords: ['magnesium silicate'] },
  {
    label: 'Shellac/pharmaceutical glaze',
    keywords: ['shellac', 'pharmaceutical glaze'],
  },
  { label: 'Carrageenan', keywords: ['carrageenan'] },
  { label: 'Potassium sorbate', keywords: ['potassium sorbate'] },
  { label: 'Ascorbyl palmitate', keywords: ['ascorbyl palmitate'] },
  { label: 'Lead', keywords: ['lead'] },
  { label: 'Calcium carbonate', keywords: ['calcium carbonate'] },
  { label: 'Magnesium oxide', keywords: ['magnesium oxide'] },
  { label: 'Bread', keywords: ['bread'] },
  { label: 'Rice', keywords: ['rice'] },
  { label: 'Pasta', keywords: ['pasta'] },
  { label: 'Fries', keywords: ['fries'] },
  { label: 'Potato', keywords: ['potato'] },
];

export function createMockMealAnalysis(mealDetails: string): MealAnalysisResult {
  const normalizedDetails = mealDetails.toLowerCase();
  const macros = estimateMacros(normalizedDetails);
  const avoidFoods = getAvoidFoods(normalizedDetails);

  const score = calculateKetovoreScore(macros.carbs, avoidFoods.length);
  const isFriendly = score >= 80;

  return {
    verdict: isFriendly
      ? 'Keto/carnivore-friendly estimate'
      : 'Needs review for keto/carnivore goals',
    score,
    scoreDisplay: getScoreDisplay(score),
    scoreLabel: getScoreLabel(score),
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

function getAvoidFoods(details: string) {
  return dirtyThirtyIngredients
    .filter((ingredient) =>
      ingredient.keywords.some((keyword) => details.includes(keyword)),
    )
    .map((ingredient) => ingredient.label);
}

function calculateKetovoreScore(carbs: number, avoidFoodCount: number) {
  const carbPenalty = Math.min(carbs * 2, 45);
  const avoidFoodPenalty = avoidFoodCount * 15;
  const score = 100 - carbPenalty - avoidFoodPenalty;

  return Math.max(0, Math.round(score));
}

function getScoreDisplay(score: number) {
  return `${Math.round(score / 10)}/10`;
}

function getScoreLabel(score: number) {
  if (score >= 90) {
    return 'Excellent fit';
  }

  if (score >= 75) {
    return 'Strong fit';
  }

  if (score >= 55) {
    return 'Moderate fit';
  }

  return 'Needs adjustment';
}

function estimateMacros(details: string): MacroEstimate {
  const estimate = { ...emptyEstimate };

  addGramFood(estimate, details, ['steak', 'red meat', 'meat'], {
    calories: 250,
    protein: 26,
    fat: 17,
    carbs: 0,
  });
  addGramFood(estimate, details, ['ground beef', 'beef'], {
    calories: 254,
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
  addGramFood(estimate, details, ['avocado'], {
    calories: 160,
    protein: 2,
    fat: 15,
    carbs: 9,
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
