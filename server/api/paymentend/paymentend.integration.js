'use strict';

var app = require('../..');
import request from 'supertest';

var newPaymentend;

describe('Paymentend API:', function() {

  describe('GET /api/paymentends', function() {
    var paymentends;

    beforeEach(function(done) {
      request(app)
        .get('/api/paymentends')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          paymentends = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(paymentends).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/paymentends', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/paymentends')
        .send({
          name: 'New Paymentend',
          info: 'This is the brand new paymentend!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newPaymentend = res.body;
          done();
        });
    });

    it('should respond with the newly created paymentend', function() {
      expect(newPaymentend.name).to.equal('New Paymentend');
      expect(newPaymentend.info).to.equal('This is the brand new paymentend!!!');
    });

  });

  describe('GET /api/paymentends/:id', function() {
    var paymentend;

    beforeEach(function(done) {
      request(app)
        .get('/api/paymentends/' + newPaymentend._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          paymentend = res.body;
          done();
        });
    });

    afterEach(function() {
      paymentend = {};
    });

    it('should respond with the requested paymentend', function() {
      expect(paymentend.name).to.equal('New Paymentend');
      expect(paymentend.info).to.equal('This is the brand new paymentend!!!');
    });

  });

  describe('PUT /api/paymentends/:id', function() {
    var updatedPaymentend;

    beforeEach(function(done) {
      request(app)
        .put('/api/paymentends/' + newPaymentend._id)
        .send({
          name: 'Updated Paymentend',
          info: 'This is the updated paymentend!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPaymentend = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPaymentend = {};
    });

    it('should respond with the updated paymentend', function() {
      expect(updatedPaymentend.name).to.equal('Updated Paymentend');
      expect(updatedPaymentend.info).to.equal('This is the updated paymentend!!!');
    });

  });

  describe('DELETE /api/paymentends/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/paymentends/' + newPaymentend._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when paymentend does not exist', function(done) {
      request(app)
        .delete('/api/paymentends/' + newPaymentend._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
