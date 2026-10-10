import mongoose from 'mongoose';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  await mongoose.connect(connectionString);
  console.log('Connected to octofit_db');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { username: 'alex.runner', email: 'alex.runner@example.com', displayName: 'Alex Rivera', points: 240 },
    { username: 'sam.cycles', email: 'sam.cycles@example.com', displayName: 'Sam Chen', points: 190 },
    { username: 'jordan.moves', email: 'jordan.moves@example.com', displayName: 'Jordan Patel', points: 175 },
    { username: 'taylor.trains', email: 'taylor.trains@example.com', displayName: 'Taylor Morgan', points: 160 },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Octocats',
      motto: 'Move together, go further',
      members: [users[0]._id, users[1]._id],
      points: 430,
    },
    {
      name: 'Code Crushers',
      motto: 'Small steps, strong habits',
      members: [users[2]._id, users[3]._id],
      points: 335,
    },
  ]);

  await User.bulkWrite([
    { updateOne: { filter: { _id: users[0]._id }, update: { $set: { team: teams[0]._id } } } },
    { updateOne: { filter: { _id: users[1]._id }, update: { $set: { team: teams[0]._id } } } },
    { updateOne: { filter: { _id: users[2]._id }, update: { $set: { team: teams[1]._id } } } },
    { updateOne: { filter: { _id: users[3]._id }, update: { $set: { team: teams[1]._id } } } },
  ]);

  const now = new Date();
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  await Activity.insertMany([
    {
      user: users[0]._id,
      team: teams[0]._id,
      activityType: 'Running',
      durationMinutes: 35,
      caloriesBurned: 320,
      completedAt: now,
    },
    {
      user: users[1]._id,
      team: teams[0]._id,
      activityType: 'Cycling',
      durationMinutes: 45,
      caloriesBurned: 410,
      completedAt: yesterday,
    },
    {
      user: users[2]._id,
      team: teams[1]._id,
      activityType: 'Strength training',
      durationMinutes: 40,
      caloriesBurned: 280,
      completedAt: now,
    },
    {
      user: users[3]._id,
      team: teams[1]._id,
      activityType: 'Yoga',
      durationMinutes: 30,
      caloriesBurned: 130,
      completedAt: lastWeek,
    },
  ]);

  await Leaderboard.insertMany(
    users
      .map((user) => ({
        user: user._id,
        team: user._id.equals(users[0]._id) || user._id.equals(users[1]._id) ? teams[0]._id : teams[1]._id,
        points: user.points,
      }))
      .sort((first, second) => second.points - first.points)
      .map((entry, index) => ({ ...entry, rank: index + 1, period: '2026-10' })),
  );

  await Workout.insertMany([
    {
      name: 'Starter Cardio',
      description: 'A gentle session to build a consistent cardio habit.',
      difficulty: 'beginner',
      durationMinutes: 25,
      exercises: ['Brisk walk', 'Step-ups', 'Cool-down stretch'],
      target: 'cardio',
    },
    {
      name: 'Full-body Strength',
      description: 'A balanced strength circuit using bodyweight movements.',
      difficulty: 'intermediate',
      durationMinutes: 35,
      exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      target: 'strength',
    },
    {
      name: 'Mobility Reset',
      description: 'A recovery-focused flow to improve mobility and flexibility.',
      difficulty: 'beginner',
      durationMinutes: 20,
      exercises: ['Cat-cow', 'Hip openers', 'Thoracic rotations', 'Child pose'],
      target: 'mobility',
    },
  ]);

  console.log('Database seeding complete');
}

seedDatabase()
  .then(() => mongoose.disconnect())
  .catch(async (error: unknown) => {
    console.error('Error seeding database:', error);
    try {
      await mongoose.disconnect();
    } catch (disconnectError) {
      console.error('Error disconnecting from octofit_db:', disconnectError);
    }
    process.exitCode = 1;
  });
