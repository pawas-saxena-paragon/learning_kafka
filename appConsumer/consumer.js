const { Kafka } = require("kafkajs");

const consumer = kafka.consumer({ groupId: 'demo-customer-consumer-group' })

await consumer.connect()
await consumer.subscribe({ topic: 'demo-customer-topic', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    })
  },
})