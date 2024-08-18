import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { isNotNumber } from "./utils";
import { calculator, Operation } from './calculator';
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
  const height = Number(_req.query.height);
  const weight = Number(_req.query.weight);

  if (isNotNumber(height) || isNotNumber(weight) || height <= 0 || weight <= 0) {
    res.status(400).send(JSON.stringify({ error: "malformatted parameters" }));
  }

  const bmiResult = calculateBmi(height, weight);
  res.send(bmiResult);
});

app.post('/calculate', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;
  const result = calculator(
    Number(value1), Number(value2), op as Operation
  );
  return res.send({ result });
});

app.post('/exercises', (req, res) => {
  try {
    if (!req.query.daily_exercises || !req.query.target) {
      return res.status(400).json({ error: 'parameters missing' });
    }

    const dailyExercisesString = req.query.daily_exercises as string;
    const daily_exercises = dailyExercisesString.split(',').map(Number);
    const target = Number(req.query.target);

    if (
      !Array.isArray(daily_exercises) ||
      daily_exercises.some((exercise) => isNotNumber(exercise)) ||
      isNotNumber(target)
    ) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
    const result = calculateExercises(target, daily_exercises);
    return res.send(result);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});