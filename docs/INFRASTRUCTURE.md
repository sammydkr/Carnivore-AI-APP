# Infrastructure Plan

## Current Phase: Expo-Only MVP

The app is currently a simple Expo + React Native + TypeScript project.

This phase does not include:

- Backend server
- Database
- Real AI API calls
- Authentication
- Payments

This keeps development beginner-friendly and makes the app easy to test in Expo Go.

## Current Stack

- React Native with Expo
- TypeScript
- Expo ImagePicker
- Local mock meal analysis
- GitHub for code and planning

## Current Data Flow

User opens app.

User taps `Scan Your Meal`.

User selects or takes a meal photo.

User types meal details, for example:

```text
400g steak, 20g butter, 8 eggs
```

The app creates a local mock estimate:

- calories
- protein
- fat
- carbs
- keto/carnivore-friendly verdict
- whole food tip
- ketone note

## Future Backend / AI Phase

When the mock flow is working well, add a secure server-side function or backend.

Future backend responsibilities:

- Protect OpenAI API keys
- Analyze meal photo and typed details
- Return structured macro and keto/carnivore results
- Save user meal history
- Save user profile and goals
- Enforce safety rules

Future AI approach:

- OpenAI image input for meal photos
- Structured output for predictable JSON results
- Server-side validation before saving or showing results

## Future Payments

RevenueCat is planned later for:

- AI Coach subscription
- Subscription entitlement checks
- Paywall experiments

## Future App Store Path

Expo EAS Build is planned later for:

- iOS builds
- Android builds
- TestFlight
- App Store submission support

Apple privacy and health-review requirements must be handled before App Store submission.

