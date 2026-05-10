import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

type Screen = 'home' | 'tracker' | 'coach' | 'settings';

const tabs: { key: Screen; label: string }[] = [
  { key: 'home', label: 'Home' },
  { key: 'tracker', label: 'Tracker' },
  { key: 'coach', label: 'AI Coach' },
  { key: 'settings', label: 'Settings' },
];

export default function App() {
  const [screen, setScreen] = React.useState<Screen>('home');

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {screen === 'home' && <HomeScreen />}
        {screen === 'tracker' && <TrackerScreen />}
        {screen === 'coach' && <CoachScreen />}
        {screen === 'settings' && <SettingsScreen />}
      </ScrollView>

      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = tab.key === screen;

          return (
            <Pressable
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

function HomeScreen() {
  return (
    <View style={styles.card}>
      <Text style={styles.logo}>Ketovore AI</Text>
      <Text style={styles.title}>Your Coach</Text>
      <Text style={styles.subtitle}>
        Track food, fasting, weight, and macros with simple wellness guidance.
      </Text>

      <View style={styles.featureGrid}>
        <FeatureCard title="Food Tracker" detail="Log simple meals" />
        <FeatureCard title="Weight" detail="Watch progress" />
        <FeatureCard title="Fasting" detail="Start and stop timer" />
        <FeatureCard title="Macros" detail="Protein, fat, carbs" />
      </View>
    </View>
  );
}

function TrackerScreen() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tracker</Text>
      <Text style={styles.subtitle}>
        This screen will hold food, macros, weight, and fasting tools.
      </Text>

      <View style={styles.metricRow}>
        <Metric label="Protein" value="0g" />
        <Metric label="Fat" value="0g" />
        <Metric label="Carbs" value="0g" />
      </View>

      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderTitle}>Next build step</Text>
        <Text style={styles.placeholderText}>
          Add a simple food entry form and daily macro summary.
        </Text>
      </View>
    </View>
  );
}

function CoachScreen() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>AI Coach</Text>
      <Text style={styles.subtitle}>
        Ask general wellness questions about keto, carnivore, fasting, and meal
        planning.
      </Text>

      <View style={styles.chatBubble}>
        <Text style={styles.chatText}>
          I can help with general education, but I do not provide medical advice,
          diagnosis, or treatment.
        </Text>
      </View>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.subtitle}>
        Profile, disclaimer, account, and app preferences will live here.
      </Text>

      <View style={styles.placeholderBox}>
        <Text style={styles.placeholderTitle}>Health disclaimer</Text>
        <Text style={styles.placeholderText}>
          Ketovore AI provides general wellness education only. Speak with a
          qualified professional before making medical decisions.
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

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaf3ff',
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 104,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    backgroundColor: '#ffffff',
    padding: 28,
    shadowColor: '#0b4ea2',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 5,
  },
  logo: {
    color: '#0f63c9',
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
  },
  title: {
    color: '#073b82',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    color: '#193b63',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    textAlign: 'center',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 28,
  },
  featureCard: {
    backgroundColor: '#f4f9ff',
    borderColor: '#d7e8ff',
    borderRadius: 16,
    borderWidth: 1,
    minHeight: 96,
    padding: 16,
    width: '47%',
  },
  featureTitle: {
    color: '#073b82',
    fontSize: 16,
    fontWeight: '800',
  },
  featureDetail: {
    color: '#315f93',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 28,
  },
  metricCard: {
    backgroundColor: '#f4f9ff',
    borderRadius: 14,
    flex: 1,
    padding: 14,
  },
  metricValue: {
    color: '#0f63c9',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  metricLabel: {
    color: '#315f93',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  placeholderBox: {
    backgroundColor: '#f4f9ff',
    borderColor: '#d7e8ff',
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 24,
    padding: 18,
  },
  placeholderTitle: {
    color: '#073b82',
    fontSize: 16,
    fontWeight: '800',
  },
  placeholderText: {
    color: '#315f93',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  chatBubble: {
    backgroundColor: '#0f63c9',
    borderRadius: 18,
    marginTop: 28,
    padding: 18,
  },
  chatText: {
    color: '#ffffff',
    fontSize: 15,
    lineHeight: 22,
  },
  tabBar: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderTopColor: '#d7e8ff',
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-around',
    left: 0,
    paddingBottom: 22,
    paddingHorizontal: 12,
    paddingTop: 12,
    position: 'absolute',
    right: 0,
  },
  tabButton: {
    borderRadius: 14,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  activeTabButton: {
    backgroundColor: '#eaf3ff',
  },
  tabText: {
    color: '#315f93',
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
  },
  activeTabText: {
    color: '#0f63c9',
  },
});
