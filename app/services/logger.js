"use strict";
var bunyan = require("bunyan");
var stream = require("stream");
var Config_1 = require("../config/Config");
var infoStream = new stream.Writable();
infoStream.writable = true;
infoStream.write = function (info) {
    console.log(JSON.parse(info).msg);
    return true;
};
exports.logger = bunyan.createLogger({
    name: Config_1.settings.name,
    environment: Config_1.settings.env,
    component: Config_1.settings.name,
    origin_server: require('os').hostname(),
    src: true,
    streams: [
        {
            level: 'info',
            type: 'rotating-file',
            path: "/var/log/stash_" + Config_1.settings.name + ".log",
            period: '1d',
            count: 3,
        }
    ]
});
