"use strict";
var fs = require("fs");
var restify = require("restify");
var config_1 = require("./config/config");
var logger_1 = require("./services/logger");
exports.api = restify.createServer({
    name: config_1.settings.name
});
restify.CORS.ALLOW_HEADERS.push('authorization');
exports.api.use(restify.CORS());
exports.api.pre(restify.pre.sanitizePath());
exports.api.use(restify.acceptParser(exports.api.acceptable));
exports.api.use(restify.bodyParser());
exports.api.use(restify.queryParser());
exports.api.use(restify.authorizationParser());
exports.api.use(restify.fullResponse());
fs.readdirSync(__dirname + '/routes').forEach(function (routeConfig) {
    if (routeConfig.substr(-3) === '.js') {
        var route = require(__dirname + '/routes/' + routeConfig);
        route.routes(exports.api);
    }
});
exports.api.listen(config_1.settings.port, function () {
    logger_1.logger.info("INFO: " + config_1.settings.name + " is running at " + exports.api.url);
    console.log("INFO: " + config_1.settings.name + " is running at " + exports.api.url);
});
