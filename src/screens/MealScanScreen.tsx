import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { createMockMealAnalysis } from '../shared/mealAnalysis';
import { shortDisclaimer } from '../shared/disclaimer';
import { tokens } from '../shared/tokens';
import type { MealAnalysisResult } from '../shared/types';

export function MealScanScreen() {
  const [imageUri, setImageUri] = React.useState<string | null>(null);
  const [mealDetails, setMealDetails] = React.useState('400g steak, 20g butter, 8 eggs');
  const [analysis, setAnalysis] = React.useState<MealAnalysisResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  async function pickImage() {
    setError(null);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setError('Photo library permission is needed to choose a meal image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  async function takePhoto() {
    setError(null);
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      setError('Camera permission is needed to take a meal photo.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  }

  function analyzeMeal() {
    const trimmedDetails = mealDetails.trim();

    if (!trimmedDetails) {
      setError('Add meal details first, like 400g steak, 20g butter, 8 eggs.');
      return;
    }

    setError(null);
    setAnalysis(createMockMealAnalysis(trimmedDetails));
  }

  return (
    <View style={styles.card}>
      <Text style={styles.eyebrow}>Meal scanner MVP</Text>
      <Text style={styles.title}>Scan Your Meal</Text>
      <Text style={styles.subtitle}>
        Add a photo, then type what you ate so the app can estimate macros more
        clearly.
      </Text>

      <View style={styles.photoBox}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.mealImage} />
        ) : (
          <Text style={styles.photoPlaceholder}>No meal photo yet</Text>
        )}
      </View>

      <View style={styles.buttonRow}>
        <Pressable
          accessibilityLabel="Choose meal photo"
          accessibilityRole="button"
          onPress={pickImage}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Choose Photo</Text>
        </Pressable>
        <Pressable
          accessibilityLabel="Take meal photo"
          accessibilityRole="button"
          onPress={takePhoto}
          style={styles.secondaryButton}
        >
          <Text style={styles.secondaryButtonText}>Take Photo</Text>
        </Pressable>
      </View>

      <Text style={styles.inputLabel}>Meal details</Text>
      <TextInput
        accessibilityLabel="Meal details"
        multiline
        onChangeText={setMealDetails}
        placeholder="Example: 400g meat, 20g butter, 8 large eggs"
        placeholderTextColor={tokens.colors.mutedText}
        style={styles.input}
        value={mealDetails}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Pressable
        accessibilityLabel="Analyze meal"
        accessibilityRole="button"
        onPress={analyzeMeal}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>Analyze Meal</Text>
      </Pressable>

      {analysis ? <AnalysisCard analysis={analysis} /> : null}
    </View>
  );
}

function AnalysisCard({ analysis }: { analysis: MealAnalysisResult }) {
  return (
    <View style={styles.analysisCard}>
      <Text style={styles.analysisTitle}>{analysis.verdict}</Text>
      <Text style={styles.analysisMessage}>{analysis.message}</Text>

      <View style={styles.metricRow}>
        <Metric label="Calories" value={`${analysis.calories}`} />
        <Metric label="Protein" value={`${analysis.protein}g`} />
        <Metric label="Fat" value={`${analysis.fat}g`} />
        <Metric label="Carbs" value={`${analysis.carbs}g`} />
      </View>

      {analysis.avoidFoods.length > 0 ? (
        <Text style={styles.warningText}>
          Review these items: {analysis.avoidFoods.join(', ')}
        </Text>
      ) : null}

      <Text style={styles.tipText}>{analysis.wholeFoodTip}</Text>
      <Text style={styles.disclaimerText}>
        {analysis.ketoneNote} {shortDisclaimer}
      </Text>
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
  photoBox: {
    alignItems: 'center',
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    height: 210,
    justifyContent: 'center',
    marginTop: tokens.spacing.lg,
    overflow: 'hidden',
  },
  mealImage: {
    height: '100%',
    width: '100%',
  },
  photoPlaceholder: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.body,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
  },
  secondaryButton: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    flex: 1,
    padding: tokens.spacing.md,
  },
  secondaryButtonText: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.body,
    fontWeight: '800',
    textAlign: 'center',
  },
  inputLabel: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.body,
    fontWeight: '800',
    marginTop: tokens.spacing.lg,
  },
  input: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    borderWidth: 1,
    color: tokens.colors.text,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
    minHeight: 104,
    padding: tokens.spacing.md,
    textAlignVertical: 'top',
  },
  errorText: {
    color: tokens.colors.warning,
    fontSize: tokens.typography.body,
    fontWeight: '700',
    marginTop: tokens.spacing.sm,
  },
  primaryButton: {
    backgroundColor: tokens.colors.primary,
    borderRadius: tokens.radius.lg,
    marginTop: tokens.spacing.lg,
    padding: tokens.spacing.md,
  },
  primaryButtonText: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
    textAlign: 'center',
  },
  analysisCard: {
    backgroundColor: tokens.colors.primaryDark,
    borderRadius: tokens.radius.xl,
    marginTop: tokens.spacing.lg,
    padding: tokens.spacing.lg,
  },
  analysisTitle: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.lead,
    fontWeight: '800',
  },
  analysisMessage: {
    color: tokens.colors.primarySoft,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
  },
  metricRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
  },
  metricCard: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
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
  warningText: {
    color: tokens.colors.primarySoft,
    fontSize: tokens.typography.body,
    fontWeight: '800',
    lineHeight: 22,
    marginTop: tokens.spacing.md,
  },
  tipText: {
    color: tokens.colors.primarySoft,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.md,
  },
  disclaimerText: {
    color: tokens.colors.primarySoft,
    fontSize: tokens.typography.caption,
    lineHeight: 18,
    marginTop: tokens.spacing.md,
  },
});
