import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { requestLogger, unknownEndpoint } from './utils/middleware';
import diagnoseRouter from './controllers/diagnose';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/diagnoses', diagnoseRouter);

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here!');
    res.send('pong');
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

