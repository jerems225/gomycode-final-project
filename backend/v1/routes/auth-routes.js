const express = require('express');
const { loginUser } = require('../controllers/businessLogic/auth');
const { createUser } = require('../controllers/users/createUser');
const router = express.Router();

router.post('/auth', loginUser);
router.post('/registration', createUser);

module.exports = router;