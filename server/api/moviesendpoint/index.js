'use strict';

var express = require('express');
var controller = require('./moviesendpoint.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/status', controller.showmap);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:movie', controller.update);

router.delete('/:id', controller.destroy);
router.put('/:movie', controller.update);
module.exports = router;
