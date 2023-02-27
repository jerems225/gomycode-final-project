const express = require('express');
const { requireAuth } = require('../controllers/businessLogic/requireAuth');
const { getUser } = require('../controllers/users/getUser');
const router = express.Router();

router.get('/user/:uuid', requireAuth, getUser);


module.exports = router;