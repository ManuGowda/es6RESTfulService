"use strict";
var AnalyticsTrackController_1 = require("../controllers/api/v1/AnalyticsTrackController");
function route(api) {
    var trackCtrl = new AnalyticsTrackController_1.AnalyticsTrackController();
    api.post('/track', function (req, res) {
        trackCtrl.track(req, res);
    });
    api.get('/api', function (req, res) {
        res.json(200, { routes: api.router.mounts });
    });
}
module.exports.routes = route;
