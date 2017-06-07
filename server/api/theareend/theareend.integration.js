'use strict';

var app = require('../..');
import request from 'supertest';

var newTheareend;

describe('Theareend API:', function() {

  describe('GET /api/theareends', function() {
    var theareends;

    beforeEach(function(done) {
      request(app)
        .get('/api/theareends')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theareends = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(theareends).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/theareends', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/theareends')
        .send({
          name: 'New Theareend',
          info: 'This is the brand new theareend!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTheareend = res.body;
          done();
        });
    });

    it('should respond with the newly created theareend', function() {
      expect(newTheareend.name).to.equal('New Theareend');
      expect(newTheareend.info).to.equal('This is the brand new theareend!!!');
    });

  });

  describe('GET /api/theareends/:id', function() {
    var theareend;

    beforeEach(function(done) {
      request(app)
        .get('/api/theareends/' + newTheareend._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          theareend = res.body;
          done();
        });
    });

    afterEach(function() {
      theareend = {};
    });

    it('should respond with the requested theareend', function() {
      expect(theareend.name).to.equal('New Theareend');
      expect(theareend.info).to.equal('This is the brand new theareend!!!');
    });

  });

  describe('PUT /api/theareends/:id', function() {
    var updatedTheareend;

    beforeEach(function(done) {
      request(app)
        .put('/api/theareends/' + newTheareend._id)
        .send({
          name: 'Updated Theareend',
          info: 'This is the updated theareend!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTheareend = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTheareend = {};
    });

    it('should respond with the updated theareend', function() {
      expect(updatedTheareend.name).to.equal('Updated Theareend');
      expect(updatedTheareend.info).to.equal('This is the updated theareend!!!');
    });

  });

  describe('DELETE /api/theareends/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/theareends/' + newTheareend._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when theareend does not exist', function(done) {
      request(app)
        .delete('/api/theareends/' + newTheareend._id)
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
