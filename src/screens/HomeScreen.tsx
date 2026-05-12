import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { tokens } from '../shared/tokens';

interface HomeScreenProps {
  onStartScan: () => void;
}

const logoSource = require('../../assets/ketovore-ai-logo.png');

export function HomeScreen({ onStartScan }: HomeScreenProps) {
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
        <Text style={styles.subtitle}>
          Snap your meal, add what you ate, and get a simple keto/carnivore
          friendly estimate.
        </Text>

        <Pressable
          accessibilityLabel="Start meal scan"
          accessibilityRole="button"
          onPress={onStartScan}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>Scan Your Meal</Text>
        </Pressable>
      </View>

      <View style={styles.featureGrid}>
        <FeatureCard title="Scan" detail="Photo plus meal notes" />
        <FeatureCard title="Analyze" detail="Mock macros for now" />
        <FeatureCard title="Ketovore" detail="Keto/carnivore check" />
        <FeatureCard title="Progress" detail="Track over time later" />
      </View>

      <View style={styles.infoBand}>
        <Text style={styles.infoTitle}>Real food first</Text>
        <Text style={styles.infoText}>
          We will highlight whole foods, low-carb choices, and foods to avoid
          like sugar, junk food, and seed oils.
        </Text>
      </View>
    </View>
  );
}

function FeatureCard({ title, detail }: { title: string; detail: string }) {
  return (
    <View style={styles.featureCard}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDetail}>{detail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    gap: tokens.spacing.md,
  },
  heroCard: {
    alignItems: 'center',
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.lg,
    shadowColor: tokens.colors.primaryDark,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.14,
    shadowRadius: 24,
    elevation: 5,
  },
  logo: {
    height: 220,
    width: '100%',
  },
  tagline: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.title,
    fontWeight: '800',
    marginTop: tokens.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.sm,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.radius.lg,
    marginTop: tokens.spacing.lg,
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
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
  },
  featureCard: {
    backgroundColor: tokens.colors.surface,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    minHeight: 96,
    padding: tokens.spacing.md,
    width: '48%',
  },
  featureTitle: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  featureDetail: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    lineHeight: 20,
    marginTop: tokens.spacing.xs,
  },
  infoBand: {
    backgroundColor: tokens.colors.primaryDark,
    borderRadius: tokens.radius.xl,
    padding: tokens.spacing.lg,
  },
  infoTitle: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  infoText: {
    color: tokens.colors.primarySoft,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
  },
});
