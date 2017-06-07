'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var paymentendCtrlStub = {
  index: 'paymentendCtrl.index',
  show: 'paymentendCtrl.show',
  create: 'paymentendCtrl.create',
  update: 'paymentendCtrl.update',
  destroy: 'paymentendCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var paymentendIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './paymentend.controller': paymentendCtrlStub
});

describe('Paymentend API Router:', function() {

  it('should return an express router instance', function() {
    expect(paymentendIndex).to.equal(routerStub);
  });

  describe('GET /api/paymentends', function() {

    it('should route to paymentend.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'paymentendCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/paymentends/:id', function() {

    it('should route to paymentend.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'paymentendCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/paymentends', function() {

    it('should route to paymentend.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'paymentendCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/paymentends/:id', function() {

    it('should route to paymentend.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'paymentendCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/paymentends/:id', function() {

    it('should route to paymentend.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'paymentendCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/paymentends/:id', function() {

    it('should route to paymentend.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'paymentendCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
