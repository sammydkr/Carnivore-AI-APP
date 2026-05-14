import type { MealAnalysisResult } from './types';

interface MacroEstimate {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface FoodDefinition {
  aliases: string[];
  defaultGrams: number;
  per100g: MacroEstimate;
}

const emptyEstimate: MacroEstimate = {
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
};

const foodDefinitions: FoodDefinition[] = [
  {
    aliases: ['ground beef'],
    defaultGrams: 250,
    per100g: { calories: 254, protein: 26, fat: 17, carbs: 0 },
  },
  {
    aliases: ['steak'],
    defaultGrams: 250,
    per100g: { calories: 250, protein: 26, fat: 17, carbs: 0 },
  },
  {
    aliases: ['beef', 'red meat', 'meat'],
    defaultGrams: 250,
    per100g: { calories: 250, protein: 26, fat: 17, carbs: 0 },
  },
  {
    aliases: ['butter'],
    defaultGrams: 15,
    per100g: { calories: 717, protein: 1, fat: 81, carbs: 0 },
  },
  {
    aliases: ['salmon'],
    defaultGrams: 200,
    per100g: { calories: 208, protein: 22, fat: 13, carbs: 0 },
  },
  {
    aliases: ['fish'],
    defaultGrams: 200,
    per100g: { calories: 180, protein: 22, fat: 8, carbs: 0 },
  },
  {
    aliases: ['chicken'],
    defaultGrams: 250,
    per100g: { calories: 165, protein: 31, fat: 4, carbs: 0 },
  },
  {
    aliases: ['pork'],
    defaultGrams: 250,
    per100g: { calories: 242, protein: 27, fat: 14, carbs: 0 },
  },
  {
    aliases: ['avocado'],
    defaultGrams: 100,
    per100g: { calories: 160, protein: 2, fat: 15, carbs: 9 },
  },
];

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
  const mealItems = getMealItems(details);

  mealItems.forEach((item) => {
    if (matchesEggs(item)) {
      addEggs(estimate, item);
      return;
    }

    const food = foodDefinitions.find((definition) =>
      definition.aliases.some((alias) => matchesAlias(item, alias)),
    );

    if (!food) {
      return;
    }

    const grams = extractGrams(item) ?? food.defaultGrams;
    addPer100gFood(estimate, food.per100g, grams);
  });

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

function getMealItems(details: string) {
  const separatedDetails = details
    .replace(/\s+(?=\d+(?:\.\d+)?\s*(?:g|gr|gram|grams)\b)/g, ', ')
    .replace(/\s+(?=\d+(?:\.\d+)?\s*(?:large\s*)?eggs?\b)/g, ', ');

  return separatedDetails
    .split(/[,;\n]+|\s+and\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function addPer100gFood(
  estimate: MacroEstimate,
  per100g: MacroEstimate,
  grams: number,
) {
  const multiplier = grams / 100;
  estimate.calories += per100g.calories * multiplier;
  estimate.protein += per100g.protein * multiplier;
  estimate.fat += per100g.fat * multiplier;
  estimate.carbs += per100g.carbs * multiplier;
}

function addEggs(estimate: MacroEstimate, details: string) {
  const eggMatch = details.match(/(\d+(?:\.\d+)?)\s*(large\s*)?eggs?\b/);
  const eggCount = eggMatch ? Number(eggMatch[1]) : 2;
  estimate.calories += eggCount * 72;
  estimate.protein += eggCount * 6;
  estimate.fat += eggCount * 5;
  estimate.carbs += eggCount * 0.5;
}

function extractGrams(details: string) {
  const gramMatch = details.match(/(\d+(?:\.\d+)?)\s*(?:g|gr|gram|grams)\b/);

  if (gramMatch) {
    return Number(gramMatch[1]);
  }

  return null;
}

function matchesEggs(details: string) {
  return /\beggs?\b/.test(details);
}

function matchesAlias(details: string, alias: string) {
  const escapedAlias = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escapedAlias}\\b`).test(details);
}

function roundEstimate(estimate: MacroEstimate): MacroEstimate {
  return {
    calories: Math.round(estimate.calories),
    protein: Math.round(estimate.protein),
    fat: Math.round(estimate.fat),
    carbs: Math.round(estimate.carbs),
  };
}
