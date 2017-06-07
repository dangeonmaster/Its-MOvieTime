'use strict';

var app = require('../..');
import request from 'supertest';

var newMapendpoint;

describe('Mapendpoint API:', function() {

  describe('GET /api/mapendpoints', function() {
    var mapendpoints;

    beforeEach(function(done) {
      request(app)
        .get('/api/mapendpoints')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mapendpoints = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(mapendpoints).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/mapendpoints', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/mapendpoints')
        .send({
          name: 'New Mapendpoint',
          info: 'This is the brand new mapendpoint!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newMapendpoint = res.body;
          done();
        });
    });

    it('should respond with the newly created mapendpoint', function() {
      expect(newMapendpoint.name).to.equal('New Mapendpoint');
      expect(newMapendpoint.info).to.equal('This is the brand new mapendpoint!!!');
    });

  });

  describe('GET /api/mapendpoints/:id', function() {
    var mapendpoint;

    beforeEach(function(done) {
      request(app)
        .get('/api/mapendpoints/' + newMapendpoint._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          mapendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      mapendpoint = {};
    });

    it('should respond with the requested mapendpoint', function() {
      expect(mapendpoint.name).to.equal('New Mapendpoint');
      expect(mapendpoint.info).to.equal('This is the brand new mapendpoint!!!');
    });

  });

  describe('PUT /api/mapendpoints/:id', function() {
    var updatedMapendpoint;

    beforeEach(function(done) {
      request(app)
        .put('/api/mapendpoints/' + newMapendpoint._id)
        .send({
          name: 'Updated Mapendpoint',
          info: 'This is the updated mapendpoint!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMapendpoint = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMapendpoint = {};
    });

    it('should respond with the updated mapendpoint', function() {
      expect(updatedMapendpoint.name).to.equal('Updated Mapendpoint');
      expect(updatedMapendpoint.info).to.equal('This is the updated mapendpoint!!!');
    });

  });

  describe('DELETE /api/mapendpoints/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/mapendpoints/' + newMapendpoint._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when mapendpoint does not exist', function(done) {
      request(app)
        .delete('/api/mapendpoints/' + newMapendpoint._id)
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
