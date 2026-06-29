import { connectDatabase } from '../db';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models';

/**
 * Seed the octofit_db database with test data.
 */
async function runSeed() {
  await connectDatabase();

  console.log('Seed the octofit_db database with test data');

  await Promise.all([
    ActivityModel.deleteMany({}),
    LeaderboardModel.deleteMany({}),
    TeamModel.deleteMany({}),
    UserModel.deleteMany({}),
    WorkoutModel.deleteMany({}),
  ]);

  const users = await UserModel.create([
    {
      name: 'Ava Lawson',
      email: 'ava.lawson@example.com',
      role: 'member',
      profile: { age: 28, heightCm: 168, weightKg: 62 },
    },
    {
      name: 'Marcus Reed',
      email: 'marcus.reed@example.com',
      role: 'coach',
      profile: { age: 34, heightCm: 180, weightKg: 78 },
    },
    {
      name: 'Nia Patel',
      email: 'nia.patel@example.com',
      role: 'member',
      profile: { age: 25, heightCm: 162, weightKg: 58 },
    },
  ]);

  const teams = await TeamModel.create([
    {
      name: 'Core Crushers',
      description: 'High-energy team focused on strength and endurance.',
      members: [users[0]._id, users[2]._id],
      score: 1240,
    },
    {
      name: 'Sprint Squad',
      description: 'Cardio-driven team that competes on pace and consistency.',
      members: [users[1]._id],
      score: 980,
    },
  ]);

  await UserModel.updateMany({ _id: { $in: teams[0].members } }, { team: teams[0]._id });
  await UserModel.updateOne({ _id: teams[1].members[0] }, { team: teams[1]._id });

  const workouts = await WorkoutModel.create([
    {
      name: 'Full Body Strength Blast',
      category: 'Strength',
      difficulty: 'Intermediate',
      durationMinutes: 45,
      exercises: ['Barbell squats', 'Deadlifts', 'Bench press', 'Plank holds'],
      recommendedFor: ['Strength', 'Hypertrophy', 'Core stability'],
    },
    {
      name: 'Urban HIIT Circuit',
      category: 'Cardio',
      difficulty: 'Advanced',
      durationMinutes: 30,
      exercises: ['Burpees', 'Box jumps', 'Sprint intervals', 'Mountain climbers'],
      recommendedFor: ['Endurance', 'Fat burn', 'Speed'],
    },
  ]);

  await ActivityModel.create([
    {
      user: users[0]._id,
      type: 'Run',
      durationMinutes: 32,
      caloriesBurned: 380,
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      notes: 'Morning trail run with hill sprints.',
    },
    {
      user: users[1]._id,
      type: 'Strength Training',
      durationMinutes: 55,
      caloriesBurned: 520,
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      notes: 'Focused on compound lifts and core stability.',
    },
    {
      user: users[2]._id,
      type: 'Yoga Flow',
      durationMinutes: 40,
      caloriesBurned: 190,
      date: new Date(Date.now() - 1000 * 60 * 60 * 12),
      notes: 'Recovery and mobility session after a long workout.',
    },
  ]);

  await LeaderboardModel.create([
    {
      user: users[0]._id,
      rank: 1,
      totalPoints: 1540,
      weeklyPoints: 410,
    },
    {
      user: users[1]._id,
      rank: 2,
      totalPoints: 1380,
      weeklyPoints: 360,
    },
    {
      user: users[2]._id,
      rank: 3,
      totalPoints: 1275,
      weeklyPoints: 325,
    },
  ]);

  console.log('Seed data insertion complete.');
  process.exit(0);
}

runSeed().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
