const express = require('express');
const { getDeviation } = require('../controller/deviationController.js');

const router = express.Router();

router.get('/deviation', getDeviation);

module.exports = router;