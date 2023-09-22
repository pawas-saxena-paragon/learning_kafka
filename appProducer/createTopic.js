const { Kafka } = require("kafkajs");

const kafkaClient = new Kafka({
  clientId: "my-demo-customer-producer",
  brokers: ["kafka:9092"],
});

const adminClient = kafkaClient.admin();

exports.createTopic = async ({ topic }) => {
  await adminClient.connect();
  console.log("admin client connected successfully");
  await adminClient.createTopics({
    topics: [
      {
        topic,
        numPartitions: 2,
      },
    ],
  });
  const topics = await adminClient.listTopics();
  console.log("All topics are", topics);

  await adminClient.disconnect();
};
