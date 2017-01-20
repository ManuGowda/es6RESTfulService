import cucumber = require('cucumber');
import Callback = cucumber.CallbackStepDefinition;

import { api as server } from '../../../app/server';
import * as supertest from 'supertest';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

export = function () {

  let event = {};
  this.Given(/^a valid json$/, (callback: Callback) => {
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

  this.When(/^track api is invoke with POST$/, (callback: Callback) => {
    callback();
  });

  this.Then(/^event should be validated and stored$/, (callback: Callback) => {
    supertest(server)
      .post('/track')
      .send(event)
      .set('Accept', 'application/json')
      .end((err: any, response: supertest.Response) => {
        if (err) {
          callback(err);
        } else {
          expect(response.status).to.equal(200);
          expect(response.body).to.equal("success");
          callback();
        }
      });

  });
};