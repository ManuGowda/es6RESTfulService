import * as kafkaNode from 'kafka-node';
import { logger } from '../services/logger';
import { Topic, Event } from 'globals';

export class KafkaClient {

  private _kafkaProducer: kafkaNode.Producer;
  private _client: kafkaNode.Client;

  constructor() {

    this._client = new kafkaNode.Client('localhost:2181', '');
    this._kafkaProducer = new kafkaNode.Producer(this._client);

    this._kafkaProducer.on('ready', (data) => {
      logger.info("Kafka producer is ready to send message!");
    });

    this._kafkaProducer.on('error', (err) => {
      logger.info("Kafka producer failed to connect!", err);
    });
    logger.info("Init: KafkaClient");
  }

  public producer(event: Event, topicName: string): Promise<any> {

    let payload: Topic = {
      topic: topicName,
      messages: JSON.stringify(event),
      partition: 0
    };

    return new Promise((resolve, reject) => {
      this._kafkaProducer.send([payload], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}