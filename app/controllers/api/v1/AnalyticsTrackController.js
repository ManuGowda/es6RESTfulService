"use strict";
var AnalyticsEvent_1 = require("../../../models/AnalyticsEvent");
var logger_1 = require("../../../services/logger");
var AnalyticsTrackController = (function () {
    function AnalyticsTrackController() {
        logger_1.logger.info("Init: AnalyticsTrackController");
        this._analyticsEvent = new AnalyticsEvent_1.AnalyticsEvent();
    }
    AnalyticsTrackController.prototype.track = function (req, res) {
        this._analyticsEvent.store(req.body)
            .then(function (data) {
            logger_1.logger.info("Successfully published event");
            res.json("success").status(200);
        })
            .catch(function (err) {
            logger_1.logger.info("Failed to published event", err);
            res.json("success").status(200);
        });
    };
    return AnalyticsTrackController;
}());
exports.AnalyticsTrackController = AnalyticsTrackController;
