import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { tokens } from '../shared/tokens';
import type { SavedMealEntry } from '../shared/types';

interface TrackerScreenProps {
  historyError: string | null;
  meals: SavedMealEntry[];
  onClearHistory: () => Promise<void>;
  onStartScan: () => void;
}

interface MacroTotals {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
}

export function TrackerScreen({
  historyError,
  meals,
  onClearHistory,
  onStartScan,
}: TrackerScreenProps) {
  const [clearError, setClearError] = React.useState<string | null>(null);
  const todayMeals = meals.filter((meal) => isToday(meal.createdAt));
  const todayTotals = getMacroTotals(todayMeals);
  const allTimeTotals = getMacroTotals(meals);
  const averageScore = getAverageScore(meals);

  async function clearHistory() {
    try {
      await onClearHistory();
      setClearError(null);
    } catch {
      setClearError('Meal history could not be cleared. Please try again.');
    }
  }

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>MVP 3</Text>
      <Text style={styles.title}>Tracker</Text>
      <Text style={styles.subtitle}>
        Save meal scans here and review your daily keto/carnivore progress.
      </Text>

      {historyError ? <Text style={styles.errorText}>{historyError}</Text> : null}
      {clearError ? <Text style={styles.errorText}>{clearError}</Text> : null}

      <View style={styles.summaryBand}>
        <Text style={styles.summaryLabel}>Today</Text>
        <Text style={styles.summaryValue}>{todayMeals.length} saved meals</Text>
      </View>

      <View style={styles.metricRow}>
        <Metric label="Calories" value={`${todayTotals.calories}`} />
        <Metric label="Protein" value={`${todayTotals.protein}g`} />
        <Metric label="Fat" value={`${todayTotals.fat}g`} />
        <Metric label="Carbs" value={`${todayTotals.carbs}g`} />
      </View>

      <View style={styles.performanceCard}>
        <Text style={styles.performanceTitle}>Ketovore performance</Text>
        <Text style={styles.performanceText}>
          Average score: {averageScore > 0 ? `${averageScore}/10` : 'No score yet'}
        </Text>
        <Text style={styles.performanceText}>
          Total saved macros: {allTimeTotals.protein}g protein, {allTimeTotals.fat}g
          fat, {allTimeTotals.carbs}g carbs
        </Text>
      </View>

      {meals.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>No saved meals yet</Text>
          <Text style={styles.emptyText}>
            Analyze a meal, tap Save to Tracker, and your history will appear here.
          </Text>
          <Pressable
            accessibilityLabel="Start meal scan"
            accessibilityRole="button"
            onPress={onStartScan}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>Start Meal Scan</Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.historySection}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Recent meals</Text>
            <Pressable
              accessibilityLabel="Clear meal history"
              accessibilityRole="button"
              onPress={clearHistory}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </Pressable>
          </View>

          {meals.map((meal) => (
            <MealHistoryCard key={meal.id} meal={meal} />
          ))}
        </View>
      )}
    </View>
  );
}

function MealHistoryCard({ meal }: { meal: SavedMealEntry }) {
  return (
    <View style={styles.mealCard}>
      {meal.imageUri ? (
        <Image source={{ uri: meal.imageUri }} style={styles.mealImage} />
      ) : null}
      <View style={styles.mealTextContent}>
        <View style={styles.mealHeader}>
          <Text style={styles.mealDate}>{formatDate(meal.createdAt)}</Text>
          <Text style={styles.mealScore}>{meal.analysis.scoreDisplay}</Text>
        </View>
        <Text style={styles.mealDetails} numberOfLines={2}>
          {meal.mealDetails}
        </Text>
        <Text style={styles.mealMacros}>
          {meal.analysis.calories} cal | {meal.analysis.protein}g protein |{' '}
          {meal.analysis.fat}g fat | {meal.analysis.carbs}g carbs
        </Text>
      </View>
    </View>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
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

function getAverageScore(meals: SavedMealEntry[]) {
  if (meals.length === 0) {
    return 0;
  }

  const totalScore = meals.reduce((sum, meal) => sum + meal.analysis.score, 0);
  return Math.round(totalScore / meals.length / 10);
}

function isToday(dateValue: string) {
  const date = new Date(dateValue);
  const today = new Date();

  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

function formatDate(dateValue: string) {
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    month: 'short',
  }).format(new Date(dateValue));
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.lg,
  },
  eyebrow: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.caption,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.title,
    fontWeight: '800',
    marginTop: tokens.spacing.xs,
  },
  subtitle: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.sm,
  },
  errorText: {
    color: tokens.colors.warning,
    fontSize: tokens.typography.body,
    fontWeight: '700',
    marginTop: tokens.spacing.md,
  },
  summaryBand: {
    backgroundColor: tokens.colors.primaryDark,
    borderRadius: tokens.radius.lg,
    marginTop: tokens.spacing.lg,
    padding: tokens.spacing.lg,
  },
  summaryLabel: {
    color: tokens.colors.primarySoft,
    fontSize: tokens.typography.caption,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  summaryValue: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.title,
    fontWeight: '900',
    marginTop: tokens.spacing.xs,
  },
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
  },
  metricCard: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    padding: tokens.spacing.sm,
    width: '47%',
  },
  metricValue: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
    textAlign: 'center',
  },
  metricLabel: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.caption,
    fontWeight: '700',
    marginTop: tokens.spacing.xs,
    textAlign: 'center',
  },
  performanceCard: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    marginTop: tokens.spacing.lg,
    padding: tokens.spacing.md,
  },
  performanceTitle: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  performanceText: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
  },
  emptyBox: {
    alignItems: 'center',
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    marginTop: tokens.spacing.lg,
    padding: tokens.spacing.lg,
  },
  emptyTitle: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  emptyText: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.radius.lg,
    marginTop: tokens.spacing.lg,
    paddingHorizontal: tokens.spacing.lg,
    paddingVertical: tokens.spacing.md,
  },
  primaryButtonText: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.body,
    fontWeight: '800',
    textAlign: 'center',
  },
  historySection: {
    marginTop: tokens.spacing.lg,
  },
  historyHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyTitle: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  clearButton: {
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.pill,
    borderWidth: 1,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.xs,
  },
  clearButtonText: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.caption,
    fontWeight: '800',
  },
  mealCard: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.sm,
    padding: tokens.spacing.sm,
  },
  mealImage: {
    backgroundColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    height: 74,
    width: 74,
  },
  mealTextContent: {
    flex: 1,
  },
  mealHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mealDate: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.caption,
    fontWeight: '700',
  },
  mealScore: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.caption,
    fontWeight: '900',
  },
  mealDetails: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.body,
    fontWeight: '800',
    lineHeight: 20,
    marginTop: tokens.spacing.xs,
  },
  mealMacros: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.caption,
    lineHeight: 18,
    marginTop: tokens.spacing.xs,
  },
});
