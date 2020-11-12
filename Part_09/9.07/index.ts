/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import { makeExcerciseReport } from './calculateExercises';
const app = express();

app.use(express.json());

app.post('/excercise', (req, res) => {
  const body = req.body;

  try {

    if (body.daily_exercises === undefined || body.target === undefined) {
      throw new Error('parameters missing');
    }

    if (!Array.isArray(body.daily_exercises) || isNaN(Number(body.target))) {
      throw new Error('malformatted parameters');
    }

    const args: string[] = [body.target, ...body.daily_exercises];
    res.send(makeExcerciseReport(args));
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server runnin gon port ${PORT}`);
});
