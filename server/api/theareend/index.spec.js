'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var theareendCtrlStub = {
  index: 'theareendCtrl.index',
  show: 'theareendCtrl.show',
  create: 'theareendCtrl.create',
  update: 'theareendCtrl.update',
  destroy: 'theareendCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var theareendIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './theareend.controller': theareendCtrlStub
});

describe('Theareend API Router:', function() {

  it('should return an express router instance', function() {
    expect(theareendIndex).to.equal(routerStub);
  });

  describe('GET /api/theareends', function() {

    it('should route to theareend.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'theareendCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/theareends/:id', function() {

    it('should route to theareend.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'theareendCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/theareends', function() {

    it('should route to theareend.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'theareendCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/theareends/:id', function() {

    it('should route to theareend.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'theareendCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/theareends/:id', function() {

    it('should route to theareend.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'theareendCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/theareends/:id', function() {

    it('should route to theareend.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'theareendCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
