import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { CoachScreen } from './src/screens/CoachScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { MealScanScreen } from './src/screens/MealScanScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { TrackerScreen } from './src/screens/TrackerScreen';
import { tokens } from './src/shared/tokens';
import type { Screen } from './src/shared/types';

const tabs: { key: Screen; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'scan', label: 'Scan' },
  { key: 'tracker', label: 'Tracker' },
  { key: 'coach', label: 'AI Coach' },
  { key: 'settings', label: 'Settings' },
];

export default function App() {
  const [screen, setScreen] = React.useState<Screen>('home');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {screen === 'home' && <HomeScreen onStartScan={() => setScreen('scan')} />}
        {screen === 'scan' && <MealScanScreen />}
        {screen === 'tracker' && <TrackerScreen />}
        {screen === 'coach' && <CoachScreen />}
        {screen === 'settings' && <SettingsScreen />}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = tab.key === screen;

          return (
            <Pressable
              accessibilityLabel={`Open ${tab.label} screen`}
              accessibilityRole="button"
              key={tab.key}
              onPress={() => setScreen(tab.key)}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.background,
  },
  content: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
    paddingBottom: 112,
  },
  tabBar: {
    alignItems: 'center',
    backgroundColor: tokens.colors.surface,
    borderTopColor: tokens.colors.border,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    gap: tokens.spacing.xs,
    justifyContent: 'space-around',
    left: 0,
    paddingBottom: 22,
    paddingHorizontal: tokens.spacing.sm,
    paddingTop: tokens.spacing.sm,
    position: 'absolute',
    right: 0,
  },
  tabButton: {
    borderRadius: tokens.radius.lg,
    flex: 1,
    paddingHorizontal: tokens.spacing.xs,
    paddingVertical: tokens.spacing.sm,
  },
  activeTabButton: {
    backgroundColor: tokens.colors.background,
  },
  tabText: {
    color: tokens.colors.mutedText,
    fontSize: tokens.typography.caption,
    fontWeight: '700',
    textAlign: 'center',
  },
  activeTabText: {
    color: tokens.colors.primary,
  },
});
