const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');

// GET all users
router.get('/', usersController.getAllUsers);

// POST a new user
router.post('/', usersController.createUser);

module.exports = router;
