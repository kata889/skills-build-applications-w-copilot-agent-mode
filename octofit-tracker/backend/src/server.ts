import express from 'express';
import './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});