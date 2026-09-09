import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const passwordHash = await argon2.hash('password123');

  const user = await prisma.user.upsert({
    where: { email: 'demo@ketovore.ai' },
    update: {},
    create: {
      email: 'demo@ketovore.ai',
      passwordHash,
      profile: {
        create: {
          displayName: 'Demo User',
          weight: 80,
          goal: 'fat_loss',
          dietStyle: 'ketovore',
          calorieGoal: 1800,
          proteinGoal: 170,
          carbLimit: 20,
        },
      },
      subscription: {
        create: {
          status: 'active',
          plan: 'premium',
          provider: 'stripe',
          providerUserId: 'cus_demo',
        },
      },
    },
    include: {
      profile: true,
      subscription: true,
    },
  });

  console.log('✅ Created demo user:', user.email);

  const meals = [
    {
      mealDetails: '400g steak, 20g butter, 8 eggs',
      imageUrl: null,
      calories: 1200,
      protein: 100,
      fat: 85,
      carbs: 5,
      score: 95,
      recognizedFoods: ['400g Steak', '20g Butter', '8 large eggs'],
      unrecognizedFoods: [],
    },
    {
      mealDetails: '250g ground beef, 25g butter, 3 eggs',
      imageUrl: null,
      calories: 850,
      protein: 70,
      fat: 60,
      carbs: 2,
      score: 98,
      recognizedFoods: ['250g Ground beef', '25g Butter', '3 large eggs'],
      unrecognizedFoods: [],
    },
    {
      mealDetails: '250g salmon, 4 eggs, 15g butter',
      imageUrl: null,
      calories: 750,
      protein: 60,
      fat: 55,
      carbs: 3,
      score: 96,
      recognizedFoods: ['250g Salmon', '15g Butter', '4 large eggs'],
      unrecognizedFoods: [],
    },
  ];

  for (const meal of meals) {
    await prisma.meal.create({
      data: {
        userId: user.id,
        ...meal,
      },
    });
  }

  console.log('✅ Created demo meals');

  const checkIn = await prisma.dailyCheckIn.create({
    data: {
      userId: user.id,
      date: new Date(),
      symptoms: {
        brainFog: 2,
        jointPain: 1,
        skinIssues: 0,
        sleepQuality: 8,
        libidoMood: 7,
        musclePerformance: 8,
      },
      habits: {
        walk1Hour: true,
        sunlight1Hour: true,
        workout5k: true,
        water2L: true,
        waterSalt: true,
        vitaminD3: true,
        iodine: true,
        mineralsVitamins: true,
      },
      comments: {
        brainFog: 'Felt sharp today',
        sleepQuality: 'Slept 8 hours',
      },
      score: 85,
    },
  });

  console.log('✅ Created demo daily check-in:', checkIn.id);

  await prisma.aiInteraction.create({
    data: {
      userId: user.id,
      type: 'meal_analysis',
      input: { mealDetails: '400g steak, 20g butter, 8 eggs' },
      output: {
        calories: 1200,
        protein: 100,
        fat: 85,
        carbs: 5,
        score: 95,
        verdict: 'Keto/carnivore-friendly estimate',
      },
    },
  });

  console.log('✅ Created demo AI interaction');
  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });