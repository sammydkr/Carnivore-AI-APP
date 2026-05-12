import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { tokens } from '../shared/tokens';

export function TrackerScreen() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tracker</Text>
      <Text style={styles.subtitle}>
        Food, fasting, weight, macros, and ketone education will live here as we
        build the MVP step by step.
      </Text>

      <View style={styles.metricRow}>
        <Metric label="Protein" value="0g" />
        <Metric label="Fat" value="0g" />
        <Metric label="Carbs" value="0g" />
      </View>

      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderTitle}>Later step</Text>
        <Text style={styles.placeholderText}>
          We will add daily food entries, fasting timer, weight history, and
          macro summaries after the meal scan MVP.
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.lg,
  },
  title: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.title,
    fontWeight: '800',
  },
  subtitle: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.sm,
  },
  metricRow: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.lg,
  },
  metricCard: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderRadius: tokens.radius.md,
    flex: 1,
    padding: tokens.spacing.md,
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
    marginTop: tokens.spacing.xs,
    textAlign: 'center',
  },
  placeholderBox: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    marginTop: tokens.spacing.lg,
    padding: tokens.spacing.md,
  },
  placeholderTitle: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  placeholderText: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
  },
});
