const express = require('express');
const { getStats } = require('../controller/cryptoController.js');

const router = express.Router();

router.get('/stats', getStats);

module.exports = router;