# Ketovore AI

**AI Meets Real Food.**

Ketovore AI is an early-stage mobile wellness app for people following ketogenic, carnivore, ketovore, and low-carb eating styles.

The first version is intentionally simple. The app starts with a meal photo/manual meal-details flow, then shows an estimated keto/carnivore-friendly analysis. Backend work has now started with a small NestJS API foundation.

## Current MVP Focus

- Home screen with Ketovore AI branding and logo
- Scan Your Meal flow
- Meal photo selection or camera capture
- Manual meal details, such as `400g steak, 20g butter, 8 eggs`
- Mock macro estimate and keto/carnivore verdict
- Tracker, AI Coach, and Settings placeholder screens
- Health disclaimer and safety language
- Backend health check endpoint

## Planned Later

- Real OpenAI meal image and text analysis
- User registration and login
- Cloud saved meal history
- Fasting timer
- Basic AI coach
- Health disclaimer
- Settings page
- Weight tracking
- Ketone education
- Ingredients and seed-oil warnings
- Barcode scanner for supermarket products
- Photo food recognition with calories and macros
- Ketone tracker with daily carb education
- AI Coach subscription at $5.99/month
- 1-on-1 coaching at $299/month
- 7-day meal plans
- Community and restaurant finder
- Local rancher finder
- Wearable integration
- Advanced vitamin engine

## Technology Stack

- Mobile app: React Native with Expo
- Language: TypeScript
- Photo picker: Expo ImagePicker
- Current data: local mock data only
- Backend: Node.js, NestJS, TypeScript
- Future AI: OpenAI API through the backend
- Future database/auth: PostgreSQL and Prisma
- Future payments: RevenueCat
- Future app builds: Expo EAS Build
- Repository: GitHub

## Local Development

Install dependencies:

```powershell
npm.cmd install
```

Start the Expo development server:

```powershell
npx.cmd expo start --tunnel
```

Run TypeScript check:

```powershell
npx.cmd tsc --noEmit
```

Run Expo project check:

```powershell
npx.cmd expo-doctor
```

## Backend Development

The backend lives in:

```text
apps/api
```

Install backend dependencies:

```powershell
cd apps/api
npm.cmd install
```

Build the backend:

```powershell
npm.cmd run build
```

Start the backend:

```powershell
npm.cmd run start:dev
```

Health check:

```text
http://localhost:3000/api/v1/health
```

## Health And Safety Position

Ketovore AI provides general wellness education only.

It does not provide medical advice, diagnosis, treatment, disease prevention, emergency support, or disease-cure claims. Users should speak with a qualified health professional before making medical decisions.

AI responses are educational estimates and may be incomplete or inaccurate. Do not use Ketovore AI for emergency medical situations or to replace professional care.

