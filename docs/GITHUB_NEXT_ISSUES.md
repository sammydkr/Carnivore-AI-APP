# GitHub Issue Cleanup

Codex can read the GitHub repository, but issue write actions are currently blocked by GitHub integration permissions.

Manual cleanup:

1. Close issue `#10 Create Expo mobile app project`
   - Reason: completed
2. Close issue `#11 Create basic app navigation`
   - Reason: completed
3. Keep issue `#12 Create home screen based on design` open until the logo/home screen is approved on a phone.
4. Create this new issue:

## Build mock meal scan flow

Description:

```md
Build the first mock Scan Your Meal flow.

Acceptance Criteria:
- User can choose or take a meal photo
- User can type meal details such as 400g steak, 20g butter, 8 eggs
- User can tap Analyze Meal
- App shows estimated calories and macros
- App shows keto/carnivore-friendly verdict
- App shows safety language that results are estimates and general wellness education
```

Suggested labels:

- feature
- frontend

Suggested milestone:

- MVP 1: App Foundation

---

## Build Anti-Aging Symptom Tracker MVP

Suggested labels:

- feature
- frontend
- enhancement

Suggested milestone:

- MVP 3: Tracker

Description:

```md
## Summary
Add a simple daily symptom and lifestyle tracker before backend/database work. This will become the first version of the Anti-Aging Engine.

The goal is to help users connect how they feel with food, hydration, minerals, sunlight, walking, workouts, fasting, and recovery habits.

## Why This Matters
Most food tracker apps only track calories and macros. Ketovore AI can become more useful by tracking how users actually feel.

This creates a future path toward:

- Anti-Aging score
- Symptom trend insights
- Food and lifestyle correlation
- AI Coach recommendations
- Daily habit accountability

## MVP Scope
Keep this local-only for now. No backend, database, OpenAI, or medical claims in this issue.

Add a daily check-in section where users can track symptoms and habits.

## Symptoms
- Brain fog
- Joint pain
- Skin issues
- Sleep quality
- Libido / mood
- Muscle performance

## Daily Lifestyle Habits
- 1 hour walk
- Sunlight at least 1 hour
- Workout or walk 5K
- Drink 2L water daily
- Water and salt daily
- Vitamin D3 with K and magnesium daily
- Iodine daily
- Minerals and vitamins daily

## Food/Fasting Context For Later Correlation
- Ribeye / fatty meat
- Lean meat
- Eggs
- Electrolytes
- Fasting duration

## User Experience
Each item should have:

- A simple tick/check control
- Optional short comment field
- Clear daily save/reset flow

Example:

Brain fog: checked
Comment: felt better after salt water

Sleep quality: 4/5
Comment: woke up once at 3 AM

## Anti-Aging Score MVP
Add a simple local score for now:

Your Anti-Aging score: 82/100 today

Simple scoring idea:

- Positive habits add points
- Symptoms reduce points
- Better sleep/mood/performance improves the score
- Keep the score educational, not medical

## Safety Rules
Use safe wellness wording only:

- General wellness education
- Not medical advice
- Does not diagnose, treat, cure, or prevent disease
- Speak with a qualified professional before medical decisions

Avoid claims like:

- Reverse disease
- Cure aging
- Treat hormone problems
- Diagnose deficiencies

## Acceptance Criteria
- User can open an Anti-Aging / Daily Check-in section.
- User can tick daily symptoms and habits.
- User can add short comments.
- App shows a simple Anti-Aging score out of 100.
- App uses safe wellness wording.
- Data can be local-only for this MVP.
- TypeScript check passes.
- Expo Doctor passes.

## Future Backend Ideas
Later, after backend/database setup, save this daily check-in history to the cloud and compare trends with meals, fasting, hydration, minerals, and exercise.

Future AI question:

What likely affected my sleep, energy, or brain fog this week?

The future engine should answer carefully using trends, not medical diagnosis.
```

