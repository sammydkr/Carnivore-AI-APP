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

const mealExamples = [
  {
    label: 'Steak + eggs',
    details: '400g steak, 20g butter, 8 eggs',
  },
  {
    label: 'Ground beef + butter',
    details: '250g ground beef, 25g butter, 3 eggs',
  },
  {
    label: 'Salmon + eggs',
    details: '250g salmon, 4 eggs, 15g butter',
  },
  {
    label: 'Chicken + avocado',
    details: '250g chicken, 100g avocado, 10g butter',
  },
];

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

  function updateMealDetails(nextDetails: string) {
    setMealDetails(nextDetails);
    setAnalysis(null);
    setError(null);
  }

  function selectMealExample(details: string) {
    updateMealDetails(details);
  }

  function clearPhoto() {
    setImageUri(null);
  }

  function resetScan() {
    setImageUri(null);
    setMealDetails('');
    setAnalysis(null);
    setError(null);
  }

  const hasMealDetails = mealDetails.trim().length > 0;

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

      <ScanStatus
        hasAnalysis={Boolean(analysis)}
        hasMealDetails={hasMealDetails}
        hasPhoto={Boolean(imageUri)}
      />

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

      {imageUri ? (
        <Pressable
          accessibilityLabel="Clear selected meal photo"
          accessibilityRole="button"
          onPress={clearPhoto}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Clear Photo</Text>
        </Pressable>
      ) : null}

      <Text style={styles.inputLabel}>Quick examples</Text>
      <View style={styles.exampleGrid}>
        {mealExamples.map((example) => (
          <Pressable
            accessibilityLabel={`Use ${example.label} example`}
            accessibilityRole="button"
            key={example.label}
            onPress={() => selectMealExample(example.details)}
            style={styles.exampleButton}
          >
            <Text style={styles.exampleButtonText}>{example.label}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.inputLabel}>Meal details</Text>
      <TextInput
        accessibilityLabel="Meal details"
        multiline
        onChangeText={updateMealDetails}
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
        <Text style={styles.primaryButtonText}>
          {analysis ? 'Analyze Again' : 'Analyze Meal'}
        </Text>
      </Pressable>

      <Pressable
        accessibilityLabel="Start a new meal scan"
        accessibilityRole="button"
        onPress={resetScan}
        style={styles.resetButton}
      >
        <Text style={styles.resetButtonText}>Start New Scan</Text>
      </Pressable>

      {analysis ? (
        <Text style={styles.editHint}>
          Need to change something? Edit the meal details above and analyze
          again.
        </Text>
      ) : null}

      {analysis ? <AnalysisCard analysis={analysis} /> : null}
    </View>
  );
}

function ScanStatus({
  hasPhoto,
  hasMealDetails,
  hasAnalysis,
}: {
  hasPhoto: boolean;
  hasMealDetails: boolean;
  hasAnalysis: boolean;
}) {
  return (
    <View style={styles.statusCard}>
      <StatusPill label="Photo" value={hasPhoto ? 'Added' : 'Not added'} />
      <StatusPill label="Details" value={hasMealDetails ? 'Added' : 'Missing'} />
      <StatusPill label="Analysis" value={hasAnalysis ? 'Ready' : 'Not analyzed'} />
    </View>
  );
}

function StatusPill({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statusPill}>
      <Text style={styles.statusLabel}>{label}</Text>
      <Text style={styles.statusValue}>{value}</Text>
    </View>
  );
}

function AnalysisCard({ analysis }: { analysis: MealAnalysisResult }) {
  return (
    <View style={styles.analysisCard}>
      <View style={styles.resultHeader}>
        <View style={styles.resultHeaderText}>
          <Text style={styles.analysisTitle}>{analysis.verdict}</Text>
          <Text style={styles.analysisMessage}>{analysis.message}</Text>
        </View>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreValue}>{analysis.scoreDisplay}</Text>
          <Text style={styles.scoreLabel}>{analysis.scoreLabel}</Text>
        </View>
      </View>

      <View style={styles.metricRow}>
        <Metric label="Calories" value={`${analysis.calories}`} />
        <Metric label="Protein" value={`${analysis.protein}g`} />
        <Metric label="Fat" value={`${analysis.fat}g`} />
        <Metric label="Carbs" value={`${analysis.carbs}g`} />
      </View>

      <ResultSection
        title="Foods included in estimate"
        body={
          analysis.recognizedFoods.length > 0
            ? analysis.recognizedFoods.join(', ')
            : 'No foods were matched yet. Try adding grams and a simple food name, like 250g steak or 3 eggs.'
        }
      />

      {analysis.unrecognizedItems.length > 0 ? (
        <ResultSection
          title="Needs nutrition database match"
          body={`Not calculated yet: ${analysis.unrecognizedItems.join(', ')}`}
        />
      ) : null}

      <ResultSection
        title="Dirty 30 ingredients to avoid"
        body={
          analysis.avoidFoods.length > 0
            ? `Review these items: ${analysis.avoidFoods.join(', ')}`
            : 'No Dirty 30 ingredients or obvious high-carb starches were found in this entry.'
        }
      />

      <ResultSection title="Whole food recommendation" body={analysis.wholeFoodTip} />
      <ResultSection title="Ketone education note" body={analysis.ketoneNote} />
      <ResultSection title="Macro accuracy note" body={analysis.dataQualityNote} compact />
      <ResultSection title="Safety note" body={shortDisclaimer} compact />
    </View>
  );
}

function ResultSection({
  title,
  body,
  compact = false,
}: {
  title: string;
  body: string;
  compact?: boolean;
}) {
  return (
    <View style={[styles.resultSection, compact && styles.compactResultSection]}>
      <Text style={styles.resultSectionTitle}>{title}</Text>
      <Text style={compact ? styles.disclaimerText : styles.resultSectionText}>
        {body}
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
  statusCard: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.md,
    padding: tokens.spacing.sm,
  },
  statusPill: {
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.md,
    flex: 1,
    padding: tokens.spacing.sm,
  },
  statusLabel: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.caption,
    fontWeight: '700',
    textAlign: 'center',
  },
  statusValue: {
    color: tokens.colors.primaryDark,
    fontSize: tokens.typography.caption,
    fontWeight: '800',
    marginTop: tokens.spacing.xs,
    textAlign: 'center',
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
  clearButton: {
    alignSelf: 'center',
    marginTop: tokens.spacing.sm,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  clearButtonText: {
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
  exampleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: tokens.spacing.sm,
    marginTop: tokens.spacing.sm,
  },
  exampleButton: {
    backgroundColor: tokens.colors.surfaceMuted,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.pill,
    borderWidth: 1,
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.sm,
  },
  exampleButtonText: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.body,
    fontWeight: '800',
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
  resetButton: {
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    marginTop: tokens.spacing.sm,
    padding: tokens.spacing.md,
  },
  resetButtonText: {
    color: tokens.colors.primary,
    fontSize: tokens.typography.body,
    fontWeight: '800',
    textAlign: 'center',
  },
  editHint: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.caption,
    lineHeight: 18,
    marginTop: tokens.spacing.sm,
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
  resultHeader: {
    flexDirection: 'row',
    gap: tokens.spacing.md,
  },
  resultHeaderText: {
    flex: 1,
  },
  scoreBadge: {
    alignItems: 'center',
    backgroundColor: tokens.colors.surface,
    borderRadius: tokens.radius.lg,
    justifyContent: 'center',
    minHeight: 92,
    padding: tokens.spacing.sm,
    width: 112,
  },
  scoreValue: {
    color: tokens.colors.primary,
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
  },
  scoreLabel: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.caption,
    fontWeight: '800',
    marginTop: tokens.spacing.xs,
    textAlign: 'center',
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
  resultSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.18)',
    borderRadius: tokens.radius.lg,
    borderWidth: 1,
    marginTop: tokens.spacing.md,
    padding: tokens.spacing.md,
  },
  compactResultSection: {
    padding: tokens.spacing.sm,
  },
  resultSectionTitle: {
    color: tokens.colors.surface,
    fontSize: tokens.typography.body,
    fontWeight: '800',
  },
  resultSectionText: {
    color: tokens.colors.primarySoft,
    fontSize: tokens.typography.body,
    lineHeight: 22,
    marginTop: tokens.spacing.xs,
  },
  disclaimerText: {
    color: tokens.colors.primarySoft,
    fontSize: tokens.typography.caption,
    lineHeight: 18,
    marginTop: tokens.spacing.md,
  },
});
