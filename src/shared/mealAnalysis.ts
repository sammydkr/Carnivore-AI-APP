import type { MealAnalysisResult } from './types';

interface MacroEstimate {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

interface FoodDefinition {
  displayName: string;
  aliases: string[];
  defaultGrams: number;
  per100g: MacroEstimate;
}

interface MacroEstimateSummary extends MacroEstimate {
  recognizedFoods: string[];
  unrecognizedItems: string[];
}

const emptyEstimate: MacroEstimate = {
  calories: 0,
  protein: 0,
  fat: 0,
  carbs: 0,
};

const foodDefinitions: FoodDefinition[] = [
  {
    displayName: 'Ground beef',
    aliases: ['ground beef', 'minced beef'],
    defaultGrams: 250,
    per100g: { calories: 250, protein: 26, fat: 17, carbs: 0 },
  },
  {
    displayName: 'Ribeye steak',
    aliases: ['ribeye steak', 'ribeye'],
    defaultGrams: 300,
    per100g: { calories: 291, protein: 24, fat: 22, carbs: 0 },
  },
  {
    displayName: 'Steak',
    aliases: ['steak', 'sirloin steak'],
    defaultGrams: 250,
    per100g: { calories: 250, protein: 26, fat: 17, carbs: 0 },
  },
  {
    displayName: 'Beef',
    aliases: ['beef', 'red meat', 'meat'],
    defaultGrams: 250,
    per100g: { calories: 250, protein: 26, fat: 17, carbs: 0 },
  },
  {
    displayName: 'Butter',
    aliases: ['butter'],
    defaultGrams: 15,
    per100g: { calories: 717, protein: 1, fat: 81, carbs: 0 },
  },
  {
    displayName: 'Ghee',
    aliases: ['ghee', 'clarified butter'],
    defaultGrams: 15,
    per100g: { calories: 900, protein: 0, fat: 100, carbs: 0 },
  },
  {
    displayName: 'Beef tallow',
    aliases: ['tallow', 'beef tallow'],
    defaultGrams: 15,
    per100g: { calories: 902, protein: 0, fat: 100, carbs: 0 },
  },
  {
    displayName: 'Salmon',
    aliases: ['salmon'],
    defaultGrams: 200,
    per100g: { calories: 208, protein: 22, fat: 13, carbs: 0 },
  },
  {
    displayName: 'Fish',
    aliases: ['fish'],
    defaultGrams: 200,
    per100g: { calories: 180, protein: 22, fat: 8, carbs: 0 },
  },
  {
    displayName: 'Tuna',
    aliases: ['tuna'],
    defaultGrams: 150,
    per100g: { calories: 132, protein: 28, fat: 1, carbs: 0 },
  },
  {
    displayName: 'Cod',
    aliases: ['cod'],
    defaultGrams: 200,
    per100g: { calories: 105, protein: 23, fat: 1, carbs: 0 },
  },
  {
    displayName: 'Sardines',
    aliases: ['sardine', 'sardines'],
    defaultGrams: 100,
    per100g: { calories: 208, protein: 25, fat: 11, carbs: 0 },
  },
  {
    displayName: 'Shrimp',
    aliases: ['shrimp', 'prawn', 'prawns'],
    defaultGrams: 150,
    per100g: { calories: 99, protein: 24, fat: 0, carbs: 0 },
  },
  {
    displayName: 'Chicken breast',
    aliases: ['chicken breast'],
    defaultGrams: 250,
    per100g: { calories: 165, protein: 31, fat: 4, carbs: 0 },
  },
  {
    displayName: 'Chicken thigh',
    aliases: ['chicken thigh', 'chicken thighs'],
    defaultGrams: 250,
    per100g: { calories: 209, protein: 26, fat: 11, carbs: 0 },
  },
  {
    displayName: 'Chicken',
    aliases: ['chicken'],
    defaultGrams: 250,
    per100g: { calories: 190, protein: 28, fat: 8, carbs: 0 },
  },
  {
    displayName: 'Pork',
    aliases: ['pork', 'pork chop', 'pork chops'],
    defaultGrams: 250,
    per100g: { calories: 242, protein: 27, fat: 14, carbs: 0 },
  },
  {
    displayName: 'Bacon',
    aliases: ['bacon'],
    defaultGrams: 50,
    per100g: { calories: 541, protein: 37, fat: 42, carbs: 1 },
  },
  {
    displayName: 'Lamb',
    aliases: ['lamb'],
    defaultGrams: 250,
    per100g: { calories: 294, protein: 25, fat: 21, carbs: 0 },
  },
  {
    displayName: 'Turkey',
    aliases: ['turkey'],
    defaultGrams: 250,
    per100g: { calories: 189, protein: 29, fat: 7, carbs: 0 },
  },
  {
    displayName: 'Cheddar cheese',
    aliases: ['cheddar', 'cheddar cheese'],
    defaultGrams: 30,
    per100g: { calories: 403, protein: 25, fat: 33, carbs: 1 },
  },
  {
    displayName: 'Mozzarella',
    aliases: ['mozzarella', 'mozzarella cheese'],
    defaultGrams: 30,
    per100g: { calories: 280, protein: 28, fat: 17, carbs: 3 },
  },
  {
    displayName: 'Heavy cream',
    aliases: ['heavy cream', 'whipping cream'],
    defaultGrams: 30,
    per100g: { calories: 340, protein: 2, fat: 36, carbs: 3 },
  },
  {
    displayName: 'Cream cheese',
    aliases: ['cream cheese'],
    defaultGrams: 30,
    per100g: { calories: 342, protein: 6, fat: 34, carbs: 4 },
  },
  {
    displayName: 'Avocado',
    aliases: ['avocado'],
    defaultGrams: 100,
    per100g: { calories: 160, protein: 2, fat: 15, carbs: 9 },
  },
  {
    displayName: 'Olive oil',
    aliases: ['olive oil'],
    defaultGrams: 15,
    per100g: { calories: 884, protein: 0, fat: 100, carbs: 0 },
  },
  {
    displayName: 'Coconut oil',
    aliases: ['coconut oil'],
    defaultGrams: 15,
    per100g: { calories: 892, protein: 0, fat: 100, carbs: 0 },
  },
  {
    displayName: 'Kimchi',
    aliases: ['kimchi'],
    defaultGrams: 100,
    per100g: { calories: 15, protein: 1, fat: 1, carbs: 2 },
  },
  {
    displayName: 'Sauerkraut',
    aliases: ['sauerkraut'],
    defaultGrams: 100,
    per100g: { calories: 19, protein: 1, fat: 0, carbs: 4 },
  },
  {
    displayName: 'Broccoli',
    aliases: ['broccoli'],
    defaultGrams: 100,
    per100g: { calories: 35, protein: 2, fat: 0, carbs: 7 },
  },
  {
    displayName: 'Cauliflower',
    aliases: ['cauliflower'],
    defaultGrams: 100,
    per100g: { calories: 25, protein: 2, fat: 0, carbs: 5 },
  },
  {
    displayName: 'Spinach',
    aliases: ['spinach'],
    defaultGrams: 100,
    per100g: { calories: 23, protein: 3, fat: 0, carbs: 4 },
  },
  {
    displayName: 'Mushrooms',
    aliases: ['mushroom', 'mushrooms'],
    defaultGrams: 100,
    per100g: { calories: 22, protein: 3, fat: 0, carbs: 3 },
  },
  {
    displayName: 'Zucchini',
    aliases: ['zucchini'],
    defaultGrams: 100,
    per100g: { calories: 17, protein: 1, fat: 0, carbs: 3 },
  },
  {
    displayName: 'Asparagus',
    aliases: ['asparagus'],
    defaultGrams: 100,
    per100g: { calories: 20, protein: 2, fat: 0, carbs: 4 },
  },
  {
    displayName: 'Cucumber',
    aliases: ['cucumber'],
    defaultGrams: 100,
    per100g: { calories: 15, protein: 1, fat: 0, carbs: 4 },
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

  const score = calculateKetovoreScore(
    macros.carbs,
    avoidFoods.length,
    macros.unrecognizedItems.length,
    macros.recognizedFoods.length,
  );
  const isFriendly = score >= 80;
  const hasUnknownFoods = macros.unrecognizedItems.length > 0;
  const hasRecognizedFoods = macros.recognizedFoods.length > 0;

  return {
    verdict: !hasRecognizedFoods
      ? 'Needs clearer meal details'
      : isFriendly
      ? 'Keto/carnivore-friendly estimate'
      : 'Needs review for keto/carnivore goals',
    score,
    scoreDisplay: getScoreDisplay(score),
    scoreLabel: getScoreLabel(score),
    calories: macros.calories,
    protein: macros.protein,
    fat: macros.fat,
    carbs: macros.carbs,
    message: !hasRecognizedFoods
      ? 'We could not match this meal to the current MVP nutrition table yet.'
      : hasUnknownFoods
      ? 'The app calculated the foods it recognized, but some items still need a database match.'
      : isFriendly
      ? 'This meal looks focused on real food, protein, and low carbohydrates.'
      : 'This meal may include foods that can raise carbs or work against ketosis.',
    recognizedFoods: macros.recognizedFoods,
    unrecognizedItems: macros.unrecognizedItems,
    avoidFoods,
    wholeFoodTip:
      'Focus on whole foods like steak, eggs, fish, chicken, butter, and simple low-carb sides.',
    ketoneNote:
      'Ketones usually rise when carbs stay low and meals are built around protein and healthy fats.',
    dataQualityNote:
      'Nutrition numbers are MVP estimates from a local food table. Production accuracy should use a trusted nutrition database and branded label data.',
  };
}

function getAvoidFoods(details: string) {
  return dirtyThirtyIngredients
    .filter((ingredient) =>
      ingredient.keywords.some((keyword) => details.includes(keyword)),
    )
    .map((ingredient) => ingredient.label);
}

function calculateKetovoreScore(
  carbs: number,
  avoidFoodCount: number,
  unrecognizedItemCount: number,
  recognizedFoodCount: number,
) {
  if (recognizedFoodCount === 0) {
    return 0;
  }

  const carbPenalty = Math.min(carbs * 2, 45);
  const avoidFoodPenalty = avoidFoodCount * 15;
  const unknownFoodPenalty = unrecognizedItemCount * 8;
  const score = 100 - carbPenalty - avoidFoodPenalty - unknownFoodPenalty;

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

function estimateMacros(details: string): MacroEstimateSummary {
  const estimate = { ...emptyEstimate };
  const mealItems = getMealItems(details);
  const recognizedFoods: string[] = [];
  const unrecognizedItems: string[] = [];

  mealItems.forEach((item) => {
    if (matchesEggs(item)) {
      addEggs(estimate, item);
      recognizedFoods.push(getEggLabel(item));
      return;
    }

    const food = foodDefinitions.find((definition) =>
      definition.aliases.some((alias) => matchesAlias(item, alias)),
    );

    if (!food) {
      unrecognizedItems.push(item);
      return;
    }

    const grams = extractGrams(item) ?? food.defaultGrams;
    addPer100gFood(estimate, food.per100g, grams);
    recognizedFoods.push(`${formatAmount(grams)}g ${food.displayName}`);
  });

  if (estimate.calories === 0) {
    return {
      calories: 0,
      protein: 0,
      fat: 0,
      carbs: 0,
      recognizedFoods,
      unrecognizedItems,
    };
  }

  return {
    ...roundEstimate(estimate),
    recognizedFoods,
    unrecognizedItems,
  };
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

function getEggLabel(details: string) {
  const eggMatch = details.match(/(\d+(?:\.\d+)?)\s*(large\s*)?eggs?\b/);
  const eggCount = eggMatch ? Number(eggMatch[1]) : 2;
  return `${formatAmount(eggCount)} large ${eggCount === 1 ? 'egg' : 'eggs'}`;
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

function formatAmount(amount: number) {
  return Number.isInteger(amount) ? `${amount}` : `${amount.toFixed(1)}`;
}

function roundEstimate(estimate: MacroEstimate): MacroEstimate {
  return {
    calories: Math.round(estimate.calories),
    protein: Math.round(estimate.protein),
    fat: Math.round(estimate.fat),
    carbs: Math.round(estimate.carbs),
  };
}
