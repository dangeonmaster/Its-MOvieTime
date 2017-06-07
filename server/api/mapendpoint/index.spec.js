'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var mapendpointCtrlStub = {
  index: 'mapendpointCtrl.index',
  show: 'mapendpointCtrl.show',
  create: 'mapendpointCtrl.create',
  update: 'mapendpointCtrl.update',
  destroy: 'mapendpointCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var mapendpointIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './mapendpoint.controller': mapendpointCtrlStub
});

describe('Mapendpoint API Router:', function() {

  it('should return an express router instance', function() {
    expect(mapendpointIndex).to.equal(routerStub);
  });

  describe('GET /api/mapendpoints', function() {

    it('should route to mapendpoint.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'mapendpointCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/mapendpoints/:id', function() {

    it('should route to mapendpoint.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'mapendpointCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/mapendpoints', function() {

    it('should route to mapendpoint.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'mapendpointCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/mapendpoints/:id', function() {

    it('should route to mapendpoint.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'mapendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/mapendpoints/:id', function() {

    it('should route to mapendpoint.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'mapendpointCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/mapendpoints/:id', function() {

    it('should route to mapendpoint.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'mapendpointCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
