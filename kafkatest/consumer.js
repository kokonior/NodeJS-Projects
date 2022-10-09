const { Kafka, logLevel } = require('kafkajs');

const host = '127.0.0.1';

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [`${host}:9092`],
  clientId: 'example-consumer',
});

const topic = 'com.examplemessage.events.incident.status.changed';
const consumer = kafka.consumer({ groupId: 'test-group' });

const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      // console.log(`- ${prefix} ${message.key}#${message.value}`)

      console.log(message.value.toString('utf-8'));

      console.log('----------------------------');

    },
  });
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e));
