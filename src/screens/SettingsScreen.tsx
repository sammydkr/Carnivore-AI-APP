import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { tokens } from '../shared/tokens';

export function SettingsScreen() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        Profile, disclaimer, account, privacy, and app preferences will live
        here.
      </Text>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerTitle}>Health disclaimer</Text>
        <Text style={styles.disclaimerText}>
          Ketovore AI provides general wellness education only. It does not
          diagnose, treat, cure, or prevent disease. Speak with a qualified
          professional before making medical decisions.
        </Text>
      </View>

      <View style={styles.serviceBox}>
        <Text style={styles.serviceTitle}>Future services</Text>
        <Text style={styles.serviceText}>
          1-on-1 coaching, ingredient warnings, ketone education, restaurant
          finder, and community features will come after the first MVP.
        </Text>
      </View>
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
  disclaimerBox: {
    backgroundColor: tokens.colors.primaryDark,
    borderRadius: tokens.radius.lg,
    marginTop: tokens.spacing.lg,
    padding: tokens.spacing.md,
  },
  disclaimerTitle: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  disclaimerText: {
    color: tokens.colors.primarySoft,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
  },
  serviceBox: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    marginTop: tokens.spacing.lg,
    padding: tokens.spacing.md,
  },
  serviceTitle: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  serviceText: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
  },
});
