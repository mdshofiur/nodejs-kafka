import { Request, Response } from "express";
import { kafka } from "../../config/kafka-config";

export const producer = kafka.producer();

export async function sendToKafka(res: Response, req: Request) {
  await producer.connect();
  const result = await producer.send({
    topic: "my-topic",
    messages: [{ value: "testing message" }],
  });
  console.log(`Sent successfully! ${JSON.stringify(result)}`);
  res.send(`Sent successfully! ${JSON.stringify(result)}`);
  await producer.disconnect();
}
