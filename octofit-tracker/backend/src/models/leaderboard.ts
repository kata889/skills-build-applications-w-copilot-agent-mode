import mongoose, { Schema } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

leaderboardSchema.index({ period: 1, rank: 1 }, { unique: true });

export const Leaderboard = mongoose.model(
  'Leaderboard',
  leaderboardSchema,
  'leaderboard',
);
