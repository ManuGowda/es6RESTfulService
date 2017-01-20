"use strict";
var kafkaNode = require("kafka-node");
var logger_1 = require("../services/logger");
var KafkaClient = (function () {
    function KafkaClient() {
        this._client = new kafkaNode.Client('localhost:2181', '');
        this._kafkaProducer = new kafkaNode.Producer(this._client);
        this._kafkaProducer.on('ready', function (data) {
            logger_1.logger.info("Kafka producer is ready to send message!");
        });
        this._kafkaProducer.on('error', function (err) {
            logger_1.logger.info("Kafka producer failed to connect!", err);
        });
        logger_1.logger.info("Init: KafkaClient");
    }
    KafkaClient.prototype.producer = function (event, topicName) {
        var _this = this;
        var payload = {
            topic: topicName,
            messages: JSON.stringify(event),
            partition: 0
        };
        return new Promise(function (resolve, reject) {
            _this._kafkaProducer.send([payload], function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    };
    return KafkaClient;
}());
exports.KafkaClient = KafkaClient;
