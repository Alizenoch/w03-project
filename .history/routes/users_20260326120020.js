const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     responses:
 *       200:
 *         description: List of users
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */

// GET all users
router.get('/', usersController.getAllUsers);

// POST a new user
router.post('/', usersController.createUser);

module.exports = router;
