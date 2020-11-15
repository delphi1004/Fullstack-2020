import express from 'express';
const cors = require('cors')
const middleware = require('./utils/middleware')

const app = express();
const PORT = 3001;

app.use(cors())
app.use(express.json());
app.use(middleware.requestLogger)

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here!');
    res.send('pong');
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

