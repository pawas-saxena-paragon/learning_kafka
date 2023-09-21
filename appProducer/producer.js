const { Kafka } = require("kafkajs");

console.log("!!!!!! starting kafka producer");

// Initialize a Kafka client
const kafka = new Kafka({
  clientId: "my-demo-customer-producer",
  brokers: ["kafka:9092"],
});

// Create a producer instance
const producer = kafka.producer();

// Produce a message to a Kafka topic
const produceMessage = async () => {
  console.log("!!!!!! kafka producer about to connect");

  await producer.connect();
  console.log("!!!!!! kafka producer connection success");

  await producer.send({
    topic: "demo-customer-topic",
    messages: [
      {
        value: "Hello, Kafka! from producer",
      },
    ],
  });

  await producer.send({
    topic: "demo-customer-topic",
    messages: [
      {
        value: "Hello, Kafka! from producer",
      },
    ],
  });

  await producer.disconnect();
};

produceMessage().catch(console.error);
