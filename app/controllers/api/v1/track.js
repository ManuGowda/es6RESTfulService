"use strict";
var validate = require("jsonschema");
var logger_1 = require("../../../services/logger");
var config_1 = require("../../../config/config");
var Validator = validate.Validator;
var v = new Validator();
var AnalyticsTrackController = (function () {
    function AnalyticsTrackController() {
    }
    AnalyticsTrackController.prototype.track = function (req, res) {
        try {
            var isValid = v.validate(req.body, config_1.schema);
            logger_1.logger.info("Event is: ", isValid);
            res.json("success").status(200);
        }
        catch (e) {
            res.json("error").status(500);
        }
    };
    return AnalyticsTrackController;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AnalyticsTrackController;
;
