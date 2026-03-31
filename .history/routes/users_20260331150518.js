// routes/users.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const usersController = require('../controllers/users');

// Middleware to protect routes
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Expect "Bearer <token>"
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with hashed password.
 */
router.post('/register', usersController.registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     description: Authenticates a user and returns a JWT if credentials are valid.
 */
router.post('/login', usersController.loginUser);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (protected)
 *   post:
 *     summary: Create a new user (admin use)
 */
router.get('/', authMiddleware, usersController.getAllUsers);
router.post('/', authMiddleware, usersController.createUser);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID (protected)
 *   put:
 *     summary: Update user by ID (protected)
 *   delete:
 *     summary: Delete user by ID (protected)
 */
router.get('/:id', authMiddleware, usersController.getUserById);
router.put('/:id', authMiddleware, usersController.updateUser);
router.delete('/:id', authMiddleware, usersController.deleteUser);

module.exports = router;
