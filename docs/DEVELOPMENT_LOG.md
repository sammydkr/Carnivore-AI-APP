# Development Log

## 2026-05-10

### What We Did

Created the first local mobile app foundation for Ketovore AI.

### Repository Setup

The GitHub repository was cloned locally:

```powershell
git clone https://github.com/sammydkr/Carnivore-AI-APP.git Carnivore-AI-APP
```

The repository was empty at the beginning, which made it ready for the first app setup.

### App Setup

Created a new Expo app using the TypeScript template:

```powershell
npx.cmd create-expo-app@latest . --template blank-typescript
```

This created the first React Native / Expo project files:

- App.tsx
- app.json
- index.ts
- package.json
- package-lock.json
- tsconfig.json
- assets/

### First App Screen

Replaced the default Expo starter text with a simple branded Ketovore AI welcome screen.

The first screen includes:

- Ketovore AI title
- "Your Coach" heading
- Short app description
- Blue and white visual style
- Centered card layout

### Verification

TypeScript check passed:

```powershell
npx.cmd tsc --noEmit
```

Expo Doctor passed all checks:

```powershell
npx.cmd expo-doctor
```

Result:

```text
17/17 checks passed. No issues detected.
```

### Current GitHub Milestones

Planning milestone:

- MVP 0: Planning & Setup

App foundation milestone:

- MVP 1: App Foundation

Current foundation issues:

- #10 Create Expo mobile app project
- #11 Create basic app navigation
- #12 Create home screen based on design

### Next Step

Configure Git name and email, then create the first commit and push the project to GitHub.

After that, continue with:

- Basic app navigation
- Home screen based on design
- Tracker screen placeholder
- AI Coach screen placeholder
- Settings screen placeholder

## 2026-05-12

### What We Planned

Updated the product direction around the Ketovore AI identity:

- Use the official Ketovore AI logo
- Keep the app white and blue
- Focus first on a simple Scan Your Meal flow
- Use mock meal analysis before real AI
- Keep health claims safe and educational

### What This Version Adds

- Logo asset added to the app
- Home screen redesigned around `AI Meets Real Food.`
- New Scan screen added
- Users can choose or take a meal photo
- Users can type meal details like `400g steak, 20g butter, 8 eggs`
- App shows local estimated calories and macros
- App shows whether the meal looks keto/carnivore-friendly
- App shows safety language that results are estimates and general wellness education

### What We Are Not Adding Yet

- Real OpenAI calls
- Backend server
- Database
- User login
- Payments
- Community
- Restaurant finder

### Next Step

Phone-test the Scan flow in Expo Go, then commit and push if it works.

## 2026-05-12: Disclaimer Text

### What We Did

Created final shared disclaimer text for the app.

The disclaimer now states:

- Ketovore AI provides general wellness education only
- Ketovore AI does not provide medical advice
- Ketovore AI does not diagnose, treat, cure, prevent disease, or provide emergency support
- Users should speak with a qualified health professional before medical decisions
- AI responses are educational estimates and may be incomplete or inaccurate

### Where It Appears

- Short disclaimer appears in the meal analysis result
- Full disclaimer appears in Settings
- AI disclaimer appears in the AI Coach placeholder
