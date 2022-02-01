const express = require('express');

const containerController = require('../controller/containerController');

const router = express.Router();

router.get('/json', containerController.getContainers);

router.post('/:id/start', containerController.postEditContainer);

router.post('/:id/stop', containerController.postEditContainer);

module.exports = router;