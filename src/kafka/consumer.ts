import { kafka } from "../../config/kafka-config";

export async function consumeFromKafka() {
  const consumer = kafka.consumer({ groupId: "test-group" });
  await consumer.connect();
  await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

  const messages: any = []; // Store Kafka messages

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: any) => {
      console.log({
        value: `message ${message.value}`,
        
      });

      messages.push(`message ${message.value}`);
    },
  });
  return messages;
 
}
