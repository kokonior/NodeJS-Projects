const { Kafka, logLevel } = require('kafkajs')

const host = '127.0.0.1'

const kafka = new Kafka({
  logLevel: logLevel.DEBUG,
  brokers: [`${host}:9092`],
  clientId: 'example-producer',
})

const topic = 'com.examplemessage.events.incident.status.changed';
const producer = kafka.producer();

const sendMessage = () => {
  let message = [
    {
      key: `KFA0001`,
      value: `Kafka message broker at number: ${Math.random()}`,
    }
  ];
  
  return producer
    .send({
      topic,
      messages: message,
    })
    .then(console.log)
    .catch(e => console.error(`[example/producer] ${e.message}`, e));
}

const run = async () => {
  await producer.connect()
  setInterval(sendMessage, 3000)
}

run().catch(e => console.error(`[example/producer] ${e.message}`, e));
