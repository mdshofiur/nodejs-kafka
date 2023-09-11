import { kafka } from "../../config/kafka-config";


export async function consumeFromKafka() { 
    try {
        const consumer = kafka.consumer({ groupId: "test-group" });
        await consumer.connect();
        await consumer.subscribe({ topic: "my-topic", fromBeginning: true });
      
        const messages: any[] = []; // Store Kafka messages
      
        await new Promise(async (resolve) => {
          await consumer.run({
            eachMessage: async ({ topic, partition, message }: any) => {
              messages.push(message.value);
            },
          });
          await consumer.disconnect();
          resolve(messages);
        });
        console.log("messages", messages);
        return messages;
    } catch (error) {
        console.log("error", error);
    }
}

