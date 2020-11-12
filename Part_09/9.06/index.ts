import express from 'express';
import { bmiCalculator } from './bmicalculator';
const app = express();

app.get('/bmi', (req, res) => {

  try {
    if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
      throw new Error('Provided values were not numbers!');
    }
    const result = bmiCalculator(Number(req.query.height), Number(req.query.weight));
    res.send(result);

  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    res.status(400).send({ error: 'malformatted parameters', message: error.message });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server runnin gon port ${PORT}`);
});
