import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { tokens } from '../shared/tokens';
import type { SavedMealEntry } from '../shared/types';

interface HomeScreenProps {
  meals: SavedMealEntry[];
  onStartScan: () => void;
}

interface MacroTotals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

const logoSource = require('../../assets/ketovore-ai-logo.png');

const dailyGoals = {
  calories: 1800,
  protein: 170,
};

export function HomeScreen({ meals, onStartScan }: HomeScreenProps) {
  const activeDay = getActiveDay(meals);
  const totals = getMacroTotals(activeDay.meals);
  const streak = getKetovoreStreak(meals);

  return (
    <View style={styles.screen}>
      <View style={styles.heroCard}>
        <Image
          accessibilityLabel="Ketovore AI logo"
          resizeMode="contain"
          source={logoSource}
          style={styles.logo}
        />
        <Text style={styles.tagline}>AI Meets Real Food.</Text>

        <Pressable
          accessibilityLabel="Start meal scan"
          accessibilityRole="button"
          onPress={onStartScan}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Scan Your Meal</Text>
        </Pressable>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.eyebrow}>Today's status</Text>
            <Text style={styles.cardTitle}>{activeDay.label}</Text>
          </View>
          <View style={styles.statusPill}>
            <Text style={styles.statusPillText}>{getDailyStatus(totals)}</Text>
          </View>
        </View>

        <ProgressLine
          current={totals.calories}
          label="Calories"
          target={dailyGoals.calories}
        />
        <ProgressLine
          current={totals.protein}
          label="Protein"
          suffix="g"
          target={dailyGoals.protein}
        />

        <View style={styles.miniMetricRow}>
          <MiniMetric label="Fat" value={`${totals.fat}g`} />
          <MiniMetric label="Carbs" value={`${totals.carbs}g`} />
          <MiniMetric label="Meals" value={`${activeDay.meals.length}`} />
        </View>
      </View>

      <View style={styles.coachCard}>
        <Text style={styles.eyebrow}>AI suggestion</Text>
        <Text style={styles.coachText}>{getSmartRecommendation(totals)}</Text>
      </View>

      <View style={styles.streakCard}>
        <View>
          <Text style={styles.eyebrow}>Streak</Text>
          <Text style={styles.streakTitle}>
            {streak > 0 ? `${streak} days ketovore` : 'Start your streak'}
          </Text>
        </View>
        <Text style={styles.streakText}>
          {streak > 0
            ? 'Keep saving real-food meals each day.'
            : 'Save one strong meal today to begin.'}
        </Text>
      </View>

      <View style={styles.infoBand}>
        <Text style={styles.infoTitle}>Real food first</Text>
        <Text style={styles.infoText}>
          We highlight whole foods, low-carb choices, and foods to avoid like
          sugar, junk food, and seed oils.
        </Text>
      </View>
    </View>
  );
}

function ProgressLine({
  current,
  label,
  suffix = '',
  target,
}: {
  current: number;
  label: string;
  suffix?: string;
  target: number;
}) {
  const progress = Math.min(current / target, 1);

  return (
    <View style={styles.progressBlock}>
      <View style={styles.progressHeader}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressValue}>
          {current}
          {suffix} / {target}
          {suffix}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.miniMetricCard}>
      <Text style={styles.miniMetricValue}>{value}</Text>
      <Text style={styles.miniMetricLabel}>{label}</Text>
    </View>
  );
}

function getActiveDay(meals: SavedMealEntry[]) {
  const todayKey = getDateKey(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);

  const todayMeals = meals.filter((meal) => getDateKey(new Date(meal.createdAt)) === todayKey);
  const yesterdayMeals = meals.filter(
    (meal) => getDateKey(new Date(meal.createdAt)) === yesterdayKey,
  );

  if (todayMeals.length > 0) {
    return { label: 'Today', meals: todayMeals };
  }

  if (yesterdayMeals.length > 0) {
    return { label: 'Yesterday', meals: yesterdayMeals };
  }

  return { label: 'Today', meals: [] };
}

function getMacroTotals(meals: SavedMealEntry[]): MacroTotals {
  const totals = meals.reduce(
    (sum, meal) => ({
      calories: sum.calories + meal.analysis.calories,
      protein: sum.protein + meal.analysis.protein,
      fat: sum.fat + meal.analysis.fat,
      carbs: sum.carbs + meal.analysis.carbs,
    }),
    { calories: 0, protein: 0, fat: 0, carbs: 0 },
  );

  return {
    calories: Math.round(totals.calories),
    protein: Math.round(totals.protein),
    fat: Math.round(totals.fat),
    carbs: Math.round(totals.carbs),
  };
}

function getDailyStatus(totals: MacroTotals) {
  if (totals.calories === 0) {
    return 'Ready to scan';
  }

  if (totals.carbs <= 20 && totals.protein >= dailyGoals.protein * 0.65) {
    return 'Fat Burning Mode';
  }

  if (totals.protein < dailyGoals.protein * 0.65) {
    return 'Build protein';
  }

  if (totals.calories > dailyGoals.calories) {
    return 'Review portions';
  }

  return 'On track';
}

function getSmartRecommendation(totals: MacroTotals) {
  if (totals.calories === 0) {
    return 'Scan your first meal today so Ketovore AI can start tracking your progress.';
  }

  if (totals.carbs > 30) {
    return 'Keep the next meal simple with protein and low-carb whole foods.';
  }

  if (totals.protein < dailyGoals.protein) {
    return `Add about ${dailyGoals.protein - totals.protein}g protein to support recovery.`;
  }

  if (totals.calories > dailyGoals.calories) {
    return 'Lower added fats in the next meal if your goal today is fat loss.';
  }

  return 'Nice work. Stay consistent with whole foods and hydration today.';
}

function getKetovoreStreak(meals: SavedMealEntry[]) {
  const strongDayKeys = new Set(
    meals
      .filter((meal) => meal.analysis.score >= 75)
      .map((meal) => getDateKey(new Date(meal.createdAt))),
  );

  let streak = 0;
  const date = new Date();

  while (strongDayKeys.has(getDateKey(date))) {
    streak += 1;
    date.setDate(date.getDate() - 1);
  }

  return streak;
}

function getDateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

const styles = StyleSheet.create({
  screen: {
    gap: tokens.spacing.md,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.md,
    shadowColor: tokens.colors.primaryDark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 4,
  },
  logo: {
    height: 118,
    width: '100%',
  },
  tagline: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
    marginTop: tokens.spacing.xs,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.radius.lg,
    marginTop: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.xl,
    paddingVertical: tokens.spacing.md,
    width: '100%',
  },
  primaryButtonText: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
    textAlign: 'center',
  },
  statusCard: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.lg,
  },
  sectionHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: tokens.spacing.md,
    justifyContent: 'space-between',
  },
  eyebrow: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.caption,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.title,
    fontWeight: '900',
    marginTop: tokens.spacing.xs,
  },
  statusPill: {
    backgroundColor: tokens.colors.primarySoft,
    borderRadius: tokens.radius.pill,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  statusPillText: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.caption,
    fontWeight: '900',
    textAlign: 'center',
  },
  progressBlock: {
    marginTop: tokens.spacing.md,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressLabel: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.body,
    fontWeight: '800',
  },
  progressValue: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    fontWeight: '700',
  },
  progressTrack: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderRadius: tokens.radius.pill,
    height: 10,
    marginTop: tokens.spacing.xs,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.radius.pill,
    height: '100%',
  },
  miniMetricRow: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
  },
  miniMetricCard: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    flex: 1,
    padding: tokens.spacing.sm,
  },
  miniMetricValue: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.lead,
    fontWeight: '900',
    textAlign: 'center',
  },
  miniMetricLabel: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.caption,
    fontWeight: '700',
    marginTop: tokens.spacing.xs,
    textAlign: 'center',
  },
  coachCard: {
    backgroundColor: tokens.colors.primaryDark,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.lg,
  },
  coachText: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
    lineHeight: 24,
    marginTop: tokens.spacing.xs,
  },
  streakCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.xl,
    borderWidth: 1,
    padding: tokens.spacing.lg,
  },
  streakTitle: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.title,
    fontWeight: '900',
    marginTop: tokens.spacing.xs,
  },
  streakText: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.sm,
  },
  infoBand: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.xl,
    borderWidth: 1,
    padding: tokens.spacing.lg,
  },
  infoTitle: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  infoText: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
  },
});
