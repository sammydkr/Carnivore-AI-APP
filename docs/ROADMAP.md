# Ketovore AI Roadmap

## Current Direction

Build the app gradually. Keep the first version simple, working on a phone, and easy to understand.

The 5 strongest core features are defined in `docs/CORE_FEATURES.md`:

- Meal Scan and Ketovore Score
- Daily Status and Tracker
- Anti-Aging Daily Check-In
- AI Coach Lite
- Premium Subscription

## MVP 0: Planning And Setup

Completed:

- MVP feature list defined
- Technology stack chosen
- Health and safety claim rules defined

Still open:

- Create app disclaimer and safety notes
- Create project README

## MVP 1: App Foundation

Completed:

- Expo mobile app project created
- Basic navigation created

In progress:

- Home screen based on Ketovore AI logo/design
- Mock meal scan flow

## MVP 2: Meal Scan MVP

Planned:

- Choose or take a meal photo
- Enter meal details manually
- Add quick-fill meal examples
- Show estimated calories and macros
- Show keto/carnivore-friendly verdict
- Warn about high-carb foods, junk foods, sugar, and seed oils
- Remind users that results are estimates and general wellness education

Future meal-example upgrades are tracked in `docs/MEAL_EXAMPLE_IDEAS.md`.

## MVP 3: Tracker

In progress:

- Basic food tracker
- Daily macro summary

Completed first:

- Save analyzed meals locally on the phone
- Show today's saved meal count
- Show today's calories, protein, fat, and carbs
- Show recent saved meals
- Clear local meal history
- Add home screen daily status, smart recommendation, and streak preview
- Add one-tap home `Scan Now` camera button with haptic feedback

Planned next:

- Anti-aging daily check-in
- Weight tracker
- Fasting timer
- Ketone education notes
- Weekly and monthly performance cards

## MVP 3.5: Anti-Aging Daily Check-In

Planned before backend:

- Daily symptom checklist
- Daily lifestyle checklist
- Optional comments for each item
- Simple local Anti-Aging score out of 100
- Safe wellness wording only
- Future correlation with meals, fasting, hydration, minerals, sunlight, walking, and workouts

## MVP 4: AI Coach Lite

Planned:

- Basic AI chat screen
- Safe AI system prompt
- General wellness guidance only
- No diagnosis, treatment, or disease-cure claims
- Subscription idea: $5.99/month after core MVP works

## MVP 5: App Store Prep

Planned:

- Privacy policy
- Terms and disclaimer
- Account deletion
- App screenshots
- TestFlight build
- App Store health and privacy review preparation

## Backend And Database Phase

Planned after the local MVP features are clear:

- Node.js + TypeScript backend
- NestJS modular API
- PostgreSQL database
- Prisma ORM
- REST-first API
- Shared contracts later

Backend roadmap is defined in `docs/BACKEND_DATABASE_ROADMAP.md`.

## Later Ecosystem Features

- Ingredients hunter
- Seed oil warnings
- 7-day meal plans
- 1-on-1 coaching at $299/month
- Restaurant finder
- Community
- Local rancher finder
- Wearable integrations

