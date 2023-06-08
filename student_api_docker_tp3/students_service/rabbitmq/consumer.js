const amqp = require("amqplib");
const StudentModel = require("../model/student");

const processMessage = async (message, queueName, channel) => {
  try {
    if (message !== null) {
      const absenceData = JSON.parse(message.content.toString());
      const student = await StudentModel.findOne({ id: absenceData.studentId });
      if (!student) {
        return res.status(404).send("student not found");
      }

      student.total_abs += 1;
      const studentUpdated = student.save();
      res.status(201).send({ res: studentUpdated, msg: "student not found" });
      console.log("absence increment by success");
      channel.consume(queueName, (message) =>
        processMessage(message, queueName, channel)
      );
      channel.ack(message);
    }
  } catch (err) {
    res
      .status(500)
      .send({ error: "student absence not increment" + err.message });
  }
};

const consumeMessage = async (queueName) => {
  try {
    const connectionURL = process.env.RABBITMQ_URL;
    if (connectionURL === undefined) {
      throw Error("rabbitmq connection url undefined");
    }
    console.log("connection url:" + connectionURL);
    console.log("queueName:" + queueName);
    const connection = await amqp.connect(connectionURL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    channel.consume(queueName, (message) =>
      processMessage(message, queueName, channel)
    );
  } catch (err) {
    console.error("error de la consumation de la message" + err.message);
  }
};

module.exports = consumeMessage;
