# Ketovore AI Core Features

This document defines the first 5 strong features for Ketovore AI before we begin backend and database implementation.

The goal is to keep the product simple, useful, and focused.

## Product Direction

Ketovore AI should not try to become every health app at once.

The strongest beginner product is:

```text
Scan food -> track progress -> check daily symptoms -> get simple AI guidance -> unlock premium insights
```

## 1. Meal Scan And Ketovore Score

### What It Does

Users take a meal photo, type what they ate, and receive:

- Estimated calories
- Estimated protein, fat, and carbs
- Keto/carnivore-friendly score
- Dirty 30 ingredient warnings
- Foods included in the estimate
- Foods that still need a nutrition database match

### Why It Matters

This is the main daily action. It makes the app useful immediately.

### Backend Later

Backend should save:

- meal photo
- meal text
- recognized foods
- macro result
- Ketovore score
- AI analysis metadata

## 2. Daily Status And Tracker

### What It Does

Users see their day at a glance:

- Calories vs goal
- Protein vs goal
- Fat
- Carbs
- Meal count
- Streak
- Recent meals

### Why It Matters

This turns the app into a daily dashboard. Users instantly know if they are on track.

### Backend Later

Backend should save:

- daily meal history
- daily macro totals
- score history
- streak history

## 3. Anti-Aging Daily Check-In

### What It Does

Users complete a daily wellness check-in with symptoms and habits:

- Brain fog
- Joint pain
- Skin issues
- Sleep quality
- Libido / mood
- Muscle performance
- 1 hour walk
- Sunlight at least 1 hour
- Workout or walk 5K
- Drink 2L water
- Water and salt
- Vitamin D3 with K and magnesium
- Iodine
- Minerals and vitamins

The app shows:

```text
Anti-Aging score: 82/100 today
```

### Why It Matters

Most nutrition apps only track food. This tracks how users feel, which makes Ketovore AI more unique and useful.

### Safety Rule

This is general wellness education only. It must not diagnose, treat, cure, prevent disease, or claim to reverse aging.

### Backend Later

Backend should save:

- daily check-in answers
- symptom comments
- habit completion
- wellness score
- trend data

## 4. AI Coach Lite

### What It Does

The AI Coach gives simple guidance based on:

- meals
- protein progress
- carbs
- daily symptoms
- habits
- streak

Examples:

```text
Add 30g protein to support recovery.
```

```text
Lower added fats today if your goal is fat loss.
```

```text
Your brain fog note appeared on a low-salt day. Consider tracking electrolytes tomorrow.
```

### Why It Matters

This makes the app feel intelligent before we build complex AI features.

### Backend Later

AI calls must happen on the backend, never directly inside the mobile app.

Backend should handle:

- prompt safety
- OpenAI API key protection
- structured output validation
- AI response history

## 5. Premium Subscription

### What It Does

Start with a simple premium plan:

```text
First month free
$4.99/month after trial
```

Premium can unlock:

- AI Coach
- Anti-Aging score history
- Weekly and monthly reports
- Smart recommendations
- Advanced meal insights
- Ingredient warnings

### Why It Matters

This gives the project a real business model without making the price too high for early users.

### App Store Rule

For iPhone digital features, subscriptions should use Apple In-App Purchases. RevenueCat can help manage subscriptions later.

### Backend Later

Backend should save:

- subscription status
- entitlement checks
- provider customer IDs
- trial status

Never trust subscription status from the mobile app alone.

## First Backend Priority

The first backend should support only the core data we need:

1. User profile and goals
2. Meal history
3. Daily check-ins
4. AI coach requests
5. Subscription entitlement status

## Recommended Backend Stack

Following the Skill.md rules:

- Node.js
- TypeScript
- NestJS
- PostgreSQL
- Prisma
- REST-first API
- Shared request and response contracts later

## Keep It Simple Rule

Do not build community, restaurant finder, coaching marketplace, or complex AI prediction until these 5 features work well.
