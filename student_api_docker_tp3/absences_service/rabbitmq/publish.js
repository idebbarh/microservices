const amqp = require("amqplib");

async function publish(queueName, message) {
  try {
    const connectionURL = process.env.RABBITMQ_URL;
    if (connectionURL === undefined) {
      throw Error("rabbitmq connection url undefined");
    }
    const connection = await amqp.connect(connectionURL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName);
    channel.sendToQueue(queueName, Buffer.from(message));
    console.log(`message publie dans la file d'attente "${queueName}"`);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  publish,
};
