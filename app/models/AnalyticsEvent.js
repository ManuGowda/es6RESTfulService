"use strict";
var jsonschema_1 = require("jsonschema");
var logger_1 = require("../services/logger");
var config_1 = require("../config/config");
var KafkaClient_1 = require("../services/KafkaClient");
var AnalyticsEvent = (function () {
    function AnalyticsEvent() {
        logger_1.logger.info("Init: AnalyticsEvent Model");
        this._kafkaClient = new KafkaClient_1.KafkaClient();
        this._validator = new jsonschema_1.Validator();
    }
    AnalyticsEvent.prototype.store = function (data) {
        try {
            var isValid = this._validator.validate(data, config_1.schema);
            var topicName = void 0;
            if (isValid.errors.length === 0) {
                topicName = "analytics.raw";
            }
            else {
                topicName = "analytics.raw";
            }
            data.user_id = Math.floor(Math.random() * 10);
            return this._kafkaClient.producer(data, topicName);
        }
        catch (e) {
            logger_1.logger.error("Error while tracking event: ", e);
        }
    };
    return AnalyticsEvent;
}());
exports.AnalyticsEvent = AnalyticsEvent;
