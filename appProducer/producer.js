const { Kafka } = require("kafkajs");

// Initialize a Kafka client
const kafka = new Kafka({
  clientId: "my-demo-customer-producer",
  brokers: ["kafka:9092"],
});

// Create a producer instance
const producer = kafka.producer();

// Produce a message to a Kafka topic
exports.produceMessage = async ({ message }) => {
  await producer.connect();
  console.log("!!!!!! kafka producer connection success");

  const sendResult = await producer.send({
    topic: "demo-customer-topic",
    messages: [
      {
        value: message,
      },
    ],
  });
  console.log("Send Result", sendResult);
  await producer.disconnect();
  console.log("Producer disconnected");
};
