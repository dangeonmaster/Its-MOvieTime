'use strict';

var express = require('express');
var controller = require('./mapendpoint.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/datetime/:Title/:location',controller.dateandtime);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
