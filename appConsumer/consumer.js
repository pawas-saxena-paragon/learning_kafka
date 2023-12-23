const { Kafka } = require("kafkajs");

// Initialize a Kafka client
const kafka = new Kafka({
  clientId: "my-demo-customer-producer",
  brokers: ["kafka:9092"],
});

const consumer = kafka.consumer({ groupId: "demo-customer-consumer-group" });

const consume = async () => {
  await consumer.connect();
  console.log("consumer connected successfully");
  await consumer.subscribe({
    topic: "demo-customer-topic",
    fromBeginning: true,
  });
  console.log("consumer subscribed successfully");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
        partition,
      });
    },
  });

  console.log("consumer started listening successfully");
};

(async () => {
  try {
    await consume();
  } catch (err) {
    console.log("Consumer error", err);
  }
})();
