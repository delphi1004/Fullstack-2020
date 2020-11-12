import express from 'express';
import { bmiCalculator } from './bmicalculator'
const app = express();

app.get('/bmi', (req, res) => {

  try {

    if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
      throw new Error('Provided values were not numbers!');
    }
    const result = bmiCalculator(Number(req.query.height), Number(req.query.weight));
    res.send(result);

  } catch (err) {
    res.status(400).send({ error: 'malformatted parameters', message: err.message })
  }
})

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server runnin gon port ${PORT}`);
});
