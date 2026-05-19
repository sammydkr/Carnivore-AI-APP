# Backend And Database Roadmap

This roadmap follows the project Skill.md direction while keeping the first backend small.

## Backend Goal

The backend should not start as a huge platform.

The first backend goal is:

```text
Create accounts, save user goals, save meals, save daily check-ins, and protect future AI/payment features.
```

## Recommended Stack

Use:

- Node.js
- TypeScript
- NestJS
- PostgreSQL
- Prisma
- REST API

Add later only when needed:

- Redis
- queues
- background jobs
- admin web app
- complex analytics

## First API Modules

### 1. Auth Module

Purpose:

- register
- login
- refresh session
- logout

Future endpoints:

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
POST /api/v1/auth/refresh
POST /api/v1/auth/logout
```

### 2. Profiles Module

Purpose:

- save user profile
- save goals
- save diet style

Future endpoints:

```text
GET   /api/v1/me
PATCH /api/v1/me/profile
```

First profile fields:

- display name
- weight
- goal
- diet style
- calorie goal
- protein goal
- carb limit

### 3. Meals Module

Purpose:

- save meal scans
- save macro result
- return meal history

Future endpoints:

```text
GET  /api/v1/meals
POST /api/v1/meals
GET  /api/v1/meals/:id
```

First meal fields:

- user id
- meal details
- image url
- calories
- protein
- fat
- carbs
- Ketovore score
- recognized foods
- unrecognized foods
- created date

### 4. Daily Check-Ins Module

Purpose:

- save Anti-Aging Daily Check-In
- save symptoms
- save habits
- calculate wellness score

Future endpoints:

```text
GET  /api/v1/daily-check-ins
POST /api/v1/daily-check-ins
GET  /api/v1/daily-check-ins/today
```

First check-in fields:

- user id
- date
- symptom answers
- habit answers
- comments
- Anti-Aging score

### 5. AI Coach Module

Purpose:

- keep OpenAI API key off the phone
- create safe AI suggestions
- validate AI output before returning it

Future endpoints:

```text
POST /api/v1/ai/coach-suggestion
POST /api/v1/ai/meal-analysis
```

Important rule:

The mobile app must never call OpenAI directly.

## First Database Tables

```text
users
profiles
meals
daily_check_ins
ai_interactions
subscriptions
```

## First Prisma Models

Draft only. Final schema should be created when we scaffold the backend.

```prisma
model User {
  id            String   @id @default(uuid())
  email         String   @unique
  passwordHash  String
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  profile       Profile?
  meals         Meal[]
  checkIns      DailyCheckIn[]
  aiInteractions AiInteraction[]
  subscription  Subscription?
}

model Profile {
  id          String   @id @default(uuid())
  userId      String   @unique
  displayName String?
  weight      Float?
  goal        String
  dietStyle   String
  calorieGoal Int
  proteinGoal Int
  carbLimit   Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
}

model Meal {
  id                String   @id @default(uuid())
  userId            String
  mealDetails        String
  imageUrl           String?
  calories           Int
  protein            Int
  fat                Int
  carbs              Int
  score              Int
  recognizedFoods    Json
  unrecognizedFoods  Json
  createdAt          DateTime @default(now())

  user              User     @relation(fields: [userId], references: [id])
}

model DailyCheckIn {
  id          String   @id @default(uuid())
  userId      String
  date        DateTime
  symptoms    Json
  habits      Json
  comments    Json
  score       Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User     @relation(fields: [userId], references: [id])
}

model AiInteraction {
  id        String   @id @default(uuid())
  userId    String
  type      String
  input     Json
  output    Json
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])
}

model Subscription {
  id             String   @id @default(uuid())
  userId         String   @unique
  status         String
  plan           String
  trialEndsAt    DateTime?
  currentPeriodEnd DateTime?
  provider       String?
  providerUserId String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  user           User     @relation(fields: [userId], references: [id])
}
```

## Build Order

1. Create backend folder and install NestJS foundation. Completed.
2. Create health check endpoint. Completed.
3. Create Prisma schema. Next.
4. Add auth module.
5. Add profiles module.
6. Add meals module.
7. Add daily check-ins module.
8. Add AI Coach module later.
9. Add subscriptions later.

## Backend Foundation Completed

The first API foundation now exists in:

```text
apps/api
```

Current endpoint:

```text
GET /api/v1/health
```

Expected response:

```json
{
  "service": "ketovore-api",
  "status": "ok",
  "timestamp": "2026-05-18T00:00:00.000Z"
}
```

Current backend scripts:

```text
npm run build
npm run start
npm run start:dev
npm run typecheck
```

## What We Should Not Build Yet

- community feed
- restaurant finder
- rancher finder
- coaching marketplace
- complex prediction model
- admin dashboard

These can come after the first 5 core features are working.
