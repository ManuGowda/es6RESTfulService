import { Validator } from 'jsonschema';
import { logger } from '../services/logger';
import { schema } from '../config/config';
import { KafkaClient } from '../services/KafkaClient';
import { Event } from 'globals';

/**
 * AnalyticsEvent
 */

export class AnalyticsEvent {

  private _kafkaClient: KafkaClient;
  private _validator: Validator;

  constructor() {
    logger.info("Init: AnalyticsEvent Model");
    this._kafkaClient = new KafkaClient();
    this._validator = new Validator();
  }

  public store(data: Event): Promise<any> {
    try {
      let isValid = this._validator.validate(data, schema);
      let topicName: string;
      if (isValid.errors.length === 0) {
        topicName = "analytics.raw";
      } else {
        topicName = "analytics.raw";
      }
      data.user_id = Math.floor(Math.random() * 10)
      return this._kafkaClient.producer(data, topicName);
    } catch (e) {
      logger.error("Error while tracking event: ", e);
    }
  }
}