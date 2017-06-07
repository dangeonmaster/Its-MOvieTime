/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/mapendpoints              ->  index
 * POST    /api/mapendpoints              ->  create
 * GET     /api/mapendpoints/:id          ->  show
 * PUT     /api/mapendpoints/:id          ->  update
 * DELETE  /api/mapendpoints/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Mapendpoint from './mapendpoint.model';

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

// Gets a list of Mapendpoints
export function index(req, res) {
  return Mapendpoint.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Mapendpoint from the DB
export function show(req, res) {
  return Mapendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Mapendpoint in the DB
export function create(req, res) {
  return Mapendpoint.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Mapendpoint in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Mapendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

//for date and time
export function dateandtime(req,res){
  return Mapendpoint.find({'MovieName':req.params.Title,'location':req.params.location}).exec()
     .then(handleEntityNotFound(res))
     .then(respondWithResult(res))
     .catch(handleError(res));
    console.log(req.params.Title);

}

// Deletes a Mapendpoint from the DB
export function destroy(req, res) {
  return Mapendpoint.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
