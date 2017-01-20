"use strict";
var server_1 = require("../../../app/server");
var supertest = require("supertest");
var chai = require('chai').use(require('chai-as-promised'));
var expect = chai.expect;
module.exports = function () {
    var event = {};
    this.Given(/^a valid json$/, function (callback) {
        event = {
            app_name: 'desktop',
            app_version: '1.0.0',
            tab_id: '10340-12131-123',
            session_id: '10340-12131-123',
            user_id: 1,
            client_time: '2016-08-24T19:46:26.042-07:00',
            ip_addr: '192.168.1.0',
            type: 'content_view'
        };
        callback();
    });
    this.When(/^track api is invoke with POST$/, function (callback) {
        callback();
    });
    this.Then(/^event should be validated and stored$/, function (callback) {
        supertest(server_1.api)
            .post('/track')
            .send(event)
            .set('Accept', 'application/json')
            .end(function (err, response) {
            if (err) {
                callback(err);
            }
            else {
                expect(response.status).to.equal(200);
                expect(response.body).to.equal("success");
                callback();
            }
        });
    });
};
