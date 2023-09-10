import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { sendToKafka } from './kafka/producer';
import { consumeFromKafka } from './kafka/consumer';

dotenv.config();

const app: Express = express();
const port = 7000;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

// Producer route
app.get('/producer', async (req: Request, res: Response) => {
  await sendToKafka(res, req);
});

// Consumer route
app.get('/consumer', async (req: Request, res: Response) => {
  const messages = await consumeFromKafka();
  res.json(messages); // Send all accumulated messages as a JSON response
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
