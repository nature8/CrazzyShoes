const express = require('express');
const router = express.Router();
const { login } = require('../controllers/users.controller');

// POST /users/login route
router.post('/login', login);

module.exports = router;
