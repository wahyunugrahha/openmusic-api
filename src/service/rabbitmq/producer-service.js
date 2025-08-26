const amqp = require('amqplib');

const ProducerService = {
  sendMessage: async (queue, message) => {
    const connection = await amqp.connect(process.env.RABBITMQ_SERVER);
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: true });

    const payload = Buffer.from(
      typeof message === 'string' ? message : JSON.stringify(message)
    );

    channel.sendToQueue(queue, payload, { persistent: true });

    await channel.close();
    await connection.close();
  },
};

module.exports = ProducerService;
