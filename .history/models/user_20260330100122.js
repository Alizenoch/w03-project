const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,   // name is mandatory
    trim: true        // removes extra spaces
  },
  email: {
    type: String,
    required: true,   // email is mandatory
    unique: true,     // no duplicate emails
    lowercase: true   // normalize email
  },
  password: {
    type: String,
    required: true  // password is mandatory
    minlength: 6 // minimum length of password
  }
}, {
  timestamps: true    // adds createdAt and updatedAt fields automatically
});

// Hash password

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
