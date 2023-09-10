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


// producer route 
app.use('/producer', sendToKafka);

// consumer route

app.use('/consumer', consumeFromKafka);


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

