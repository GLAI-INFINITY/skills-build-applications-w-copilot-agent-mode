import express, { Request, Response } from 'express';
import { connectDatabase } from './db';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models';

const app = express();
app.use(express.json());

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.get('/api/users', async (req: Request, res: Response) => {
  const users = await UserModel.find().populate('team');
  res.json({ baseUrl, data: users });
});

app.get('/api/teams', async (req: Request, res: Response) => {
  const teams = await TeamModel.find().populate('members');
  res.json({ baseUrl, data: teams });
});

app.get('/api/activities', async (req: Request, res: Response) => {
  const activities = await ActivityModel.find().populate('user');
  res.json({ baseUrl, data: activities });
});

app.get('/api/leaderboard', async (req: Request, res: Response) => {
  const leaderboard = await LeaderboardModel.find().populate('user').sort({ rank: 1 });
  res.json({ baseUrl, data: leaderboard });
});

app.get('/api/workouts', async (req: Request, res: Response) => {
  const workouts = await WorkoutModel.find();
  res.json({ baseUrl, data: workouts });
});

const port = process.env.PORT ? Number(process.env.PORT) : 8000;

connectDatabase().then(() => {
  app.listen(port, () => {
    console.log(`OctoFit Tracker API listening on port ${port}`);
    console.log(`Base URL: ${baseUrl}`);
  });
});
