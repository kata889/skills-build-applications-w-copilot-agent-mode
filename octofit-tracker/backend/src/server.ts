import express from 'express';
import mongoose from 'mongoose';
import './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

const listCollection = (collectionName: string) => async (
  _request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) => {
  if (mongoose.connection.readyState !== 1) {
    response.status(503).json({ error: 'Database is not available' });
    return;
  }

  try {
    const projection =
      collectionName === 'users' ? { password: 0, passwordHash: 0 } : undefined;
    const records = await mongoose.connection
      .collection(collectionName)
      .find({}, { projection })
      .toArray();
    response.json(records);
  } catch (error) {
    next(error);
  }
};

app.get('/api/users/', listCollection('users'));
app.get('/api/teams/', listCollection('teams'));
app.get('/api/activities/', listCollection('activities'));
app.get('/api/leaderboard/', listCollection('leaderboard'));
app.get('/api/workouts/', listCollection('workouts'));

app.use(
  (
    error: unknown,
    _request: express.Request,
    response: express.Response,
    _next: express.NextFunction,
  ) => {
    console.error('API request failed:', error);
    response.status(500).json({ error: 'Internal server error' });
  },
);

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening at ${baseUrl} (port ${port})`);
});