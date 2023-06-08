const amqp = require("amqplib");
const StudentModel = require("../model/student");

const processMessage = async (message, queueName, channel) => {
  if (message !== null) {
    const absenceData = JSON.parse(message.content.toString());
    const student = await StudentModel.findOne({
      where: {
        id: absenceData.id,
      },
    });
  }
};
