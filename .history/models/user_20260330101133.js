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

// Hash password before saving the user document
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) return next(); // if password is not modified, skip hashing
  try {
    const salt = await bcrypt.genSalt(10); // generate salt with 10 rounds
    this.password = await bcrypt.hash(this.password, salt); // hash the password
    next(); // proceed to save the user
  } catch (err) {
    next (err); // pass error to the next middlewre
  }
  
});

// Compare entered password with stored hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.)
}

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
