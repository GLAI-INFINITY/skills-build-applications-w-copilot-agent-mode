import { Schema, model, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  role: string;
  profile: {
    age: number;
    heightCm: number;
    weightKg: number;
  };
  team?: Types.ObjectId;
}

export interface TeamDocument extends Document {
  name: string;
  description: string;
  members: Types.ObjectId[];
  score: number;
}

export interface ActivityDocument extends Document {
  user: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: Date;
  notes: string;
}

export interface LeaderboardDocument extends Document {
  user: Types.ObjectId;
  rank: number;
  totalPoints: number;
  weeklyPoints: number;
}

export interface WorkoutDocument extends Document {
  name: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
  recommendedFor: string[];
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  profile: {
    age: { type: Number, required: true },
    heightCm: { type: Number, required: true },
    weightKg: { type: Number, required: true },
  },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
});

const teamSchema = new Schema<TeamDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: { type: Number, required: true, default: 0 },
});

const activitySchema = new Schema<ActivityDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String, required: true },
});

const leaderboardSchema = new Schema<LeaderboardDocument>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  totalPoints: { type: Number, required: true },
  weeklyPoints: { type: Number, required: true },
});

const workoutSchema = new Schema<WorkoutDocument>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String, required: true }],
  recommendedFor: [{ type: String, required: true }],
  createdAt: { type: Date, default: () => new Date() },
});

export const UserModel = model<UserDocument>('User', userSchema);
export const TeamModel = model<TeamDocument>('Team', teamSchema);
export const ActivityModel = model<ActivityDocument>('Activity', activitySchema);
export const LeaderboardModel = model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export const WorkoutModel = model<WorkoutDocument>('Workout', workoutSchema);
