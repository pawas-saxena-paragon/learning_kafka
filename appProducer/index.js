const express = require("express");
const bodyParser = require("body-parser");
const { createTopic } = require("./createTopic");
const { produceMessage } = require("./producer");

const app = express();
app.use(bodyParser.json());

app.post("/topic", async (req, res) => {
  console.log("create topic request", req.body);
  if (!req.body.topic) {
    throw "no topic in body";
  }
  try {
    await createTopic({ topic: req.body.topic });
  } catch (err) {
    console.log("Unable to create topic", err);
  }
  return res.json({});
});

app.post("/message", async (req, res) => {
  console.log("send message request body", req.body);
  if (!req.body.message) {
    throw "no message in body";
  }
  try {
    await produceMessage({ message: req.body.message });
  } catch (err) {
    console.log("Unable to produce message", err);
  }
  return res.json({});
});

app.listen(3000, () => {
  console.log("app started on port 3000");
});
