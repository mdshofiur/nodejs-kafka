import { kafka } from '../../config/kafka-config'


export async function consumeFromKafka() { 
    const consumer = kafka.consumer({ groupId: 'test-group' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }:any) => {
        console.log({
            partition,
            offset: message.offset,
            value: message.value.toString(),
        })
        },
    })
}