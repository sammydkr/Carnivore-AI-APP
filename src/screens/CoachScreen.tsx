import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { tokens } from '../shared/tokens';

export function CoachScreen() {
  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Coming after scan MVP</Text>
      <Text style={styles.title}>AI Coach</Text>
      <Text style={styles.subtitle}>
        The paid AI coach will offer general education for keto, carnivore,
        fasting, real foods, and meal planning.
      </Text>

      <View style={styles.chatBubble}>
        <Text style={styles.chatText}>
          I can help with general wellness education, but I do not provide
          medical advice, diagnosis, treatment, or emergency support.
        </Text>
      </View>

      <View style={styles.serviceCard}>
        <Text style={styles.serviceTitle}>Planned service</Text>
        <Text style={styles.serviceText}>
          AI Coach subscription target: $5.99/month after the core MVP works.
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
  eyebrow: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.caption,
    fontWeight: '800',
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
  chatBubble: {
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.radius.lg,
    marginTop: tokens.spacing.lg,
    padding: tokens.spacing.md,
  },
  chatText: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.body,
    lineHeight: 22,
  },
  serviceCard: {
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
