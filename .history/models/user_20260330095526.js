const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

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
  }
}, {
  timestamps: true    // adds createdAt and updatedAt fields automatically
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
