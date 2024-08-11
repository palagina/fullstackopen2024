import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { isNotNumber } from "./utils";

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});