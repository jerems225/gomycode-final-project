const express = require('express');
const { convert } = require('../controllers/requests/convert');
const router = express.Router();

router.post('/convert', convert);

module.exports = router;