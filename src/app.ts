import cors from 'cors';
import express, { type ErrorRequestHandler } from 'express';

import { getSpreadResults } from './services/spread.service';

const app = express();

app.use(cors());

app.get('/api', async (_req, res, next) => {
  try {
    const results = await getSpreadResults();
    res.json(results);
  } catch (error) {
    next(error);
  }
});

app.get('/', (req, res) => {
  console.log(`Connected as IP: ${req.ip}\n`);
  res.send(`Connected as IP: ${req.ip}\nPlease use /api`);
});

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ error: 'internal_error' });
};

app.use(errorHandler);

export default app;
