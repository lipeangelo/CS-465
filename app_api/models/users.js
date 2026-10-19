const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// Define the schema used to store registered users.
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  hash: String,
  salt: String
});

// Generate a unique salt and hash the user's password.
// The original password is never stored in the database.
userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    'sha512'
  ).toString('hex');
};

// Validate a supplied password against the stored hash.
userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(
    password,
    this.salt,
    1000,
    64,
    'sha512'
  ).toString('hex');

  return this.hash === hash;
};

// Generate a signed JWT that expires after one hour.
userSchema.methods.generateJWT = function() {
  const expiry = new Date();
  expiry.setHours(expiry.getHours() + 1);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: Math.floor(expiry.getTime() / 1000)
    },
    process.env.JWT_SECRET
  );
};

// Register the user model with Mongoose.
mongoose.model('users', userSchema);

module.exports = mongoose.model('users');
