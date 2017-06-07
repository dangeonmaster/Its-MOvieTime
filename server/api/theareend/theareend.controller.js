/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/theareends              ->  index
 * POST    /api/theareends              ->  create
 * GET     /api/theareends/:id          ->  show
 * PUT     /api/theareends/:id          ->  update
 * DELETE  /api/theareends/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Theareend from './theareend.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Theareends
export function index(req, res) {
  return Theareend.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Theareend from the DB
export function show(req, res) {
  return Theareend.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Theareend in the DB
export function create(req, res) {
  return Theareend.findOne({'TheatreName':req.params.TheatreName, 'PlaceName':req.params.PlaceName, 'City':req.params.City}, function(err, data){
    if(!data){
  return Theareend.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}
else{
  console.log('Data already added!!!!');
}

   });

 }



// Updates an existing Theareend in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Theareend.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Theareend from the DB
export function destroy(req, res) {
  return Theareend.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
