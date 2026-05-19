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

## 2026-05-12: Improved Mock Meal Result

### What We Did

Improved the mock meal analysis result so users can understand the result faster.

The result now shows:

- Meal verdict
- Keto/carnivore score as a simple `8/10` style label
- Estimated calories
- Estimated protein, fat, and carbs
- Dirty 30 ingredients to avoid section
- Whole food recommendation
- Ketone education note
- Safety disclaimer

### Important Note

The result is still a local mock estimate. Real AI image analysis and validated nutrition data will come later.

## 2026-05-14: Meal Quick-Fill Examples

### What We Did

Added quick-fill meal examples to make the Scan screen faster to test.

The quick examples are:

- Steak + eggs
- Ground beef + butter
- Salmon + eggs
- Chicken + avocado

Tapping an example fills the meal details field while still allowing the user to edit the text manually.

### Future Ideas Saved

Created `docs/MEAL_EXAMPLE_IDEAS.md` to capture future meal example ideas:

- Goal-based examples
- Meal category filters
- Beginner meal templates
- Score previews
- Food education notes
- Meal size options
- Warning meal examples
- Learn by Example cards
- Favorite meals
- Cultural and restaurant-style examples
- Shopping-style examples

## 2026-05-14: Reset And Edit Scan Flow

### What We Did

Improved the Scan screen so users can change their mind without getting stuck.

The scan flow now supports:

- Simple scan status for photo, meal details, and analysis
- Clear Photo button
- Start New Scan button
- Editing meal details after analysis
- Clearing old analysis when meal details change
- Analyze Again button label after a result exists
- Helper text explaining that users can edit and analyze again

## 2026-05-14: Meal Math And Keyboard Fix

### What We Fixed

Improved two early MVP bugs found during phone testing:

- Meal macro estimates are now calculated item by item instead of matching every food word across the full text.
- `ground beef`, `steak`, `butter`, `salmon`, `fish`, `chicken`, `pork`, `avocado`, and `eggs` now use clearer default portions and exact gram amounts when typed.
- The app now uses a keyboard-aware layout so the phone keyboard does not hide the meal details field while users type.

### Important Note

These numbers are still simple MVP estimates for testing. Later we should connect the app to a trusted nutrition data source before giving users production-level macro results.

## 2026-05-14: Safer Macro Estimate Messaging

### What We Changed

Improved the meal analysis so the app is more honest about nutrition calculations:

- Added a larger local nutrition table for common keto/carnivore MVP foods.
- Removed the fake fallback macro result when the app cannot recognize a food.
- Added a `Foods included in estimate` section to show what was calculated.
- Added a `Needs nutrition database match` section for foods that were not calculated yet.
- Added a macro accuracy note explaining that production accuracy needs a trusted nutrition database and branded label data.

### Product Decision

ChatGPT can help parse meal text and explain results, but the final calorie and macro numbers should come from verified nutrition data. This keeps the app safer, more trustworthy, and easier to approve later.

## 2026-05-14: MVP 3 Local Meal Tracker

### What We Added

Started MVP 3 by turning meal analysis into saved local tracker history.

The app now supports:

- Save analyzed meals to local phone storage
- Keep up to 50 recent saved meals
- Show today's saved meal count
- Show today's calories, protein, fat, and carbs
- Show a simple average ketovore score
- Show recent saved meal cards
- Clear local meal history

### Technical Note

Added `@react-native-async-storage/async-storage` for simple local storage during the Expo MVP phase. This is not a backend or account system yet. Later, user accounts and cloud sync can move this history to a real database.

## 2026-05-14: Home Daily Status Upgrade

### What We Added

Updated the Home screen so it feels more useful after users save meals.

The Home screen now shows:

- Smaller Ketovore AI logo to create more space
- Today's Status card
- Calories progress against a simple 1,800 calorie starter goal
- Protein progress against a simple 170g starter goal
- Fat, carbs, and meal count
- Smart AI Coach preview recommendation
- Ketovore streak preview

### Product Note

The daily goals are temporary MVP defaults. Later, profile setup should personalize goals based on weight, activity, and user objective.

## 2026-05-14: Scan Now Camera Button

### What We Added

Improved the Home screen scan action:

- Replaced the generic home scan button with a large `Scan Now` pill button.
- Added a camera icon to make the primary action easier to recognize.
- Added haptic feedback on tap.
- Tapping `Scan Now` now opens the Scan screen and launches the camera directly.

### Product Reason

This makes the main action faster and simpler. The fewer taps it takes to scan a meal, the more likely users are to use the app every day.

## 2026-05-18: Anti-Aging Tracker Planning

### What We Decided

Before backend and database work, we planned a local Anti-Aging Daily Check-In feature.

The feature will let users track:

- Brain fog
- Joint pain
- Skin issues
- Sleep quality
- Libido / mood
- 1 hour walk
- Sunlight at least 1 hour
- Workout or walk 5K
- Muscle performance
- Vitamin D3 with K and magnesium daily
- Iodine daily
- Water and salt daily
- Drink 2L water daily
- Minerals and vitamins daily

### Product Direction

This should start as a local wellness tracker with a simple `Anti-Aging score: 82/100 today` style result.

Later, after backend and database setup, the app can compare these check-ins with meals, fasting, hydration, minerals, sunlight, and workouts.

### Safety Note

This feature must use safe wellness language only. It should not diagnose, treat, cure, prevent disease, or claim to reverse aging.
