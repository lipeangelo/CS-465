const passport = require('passport');
const mongoose = require('mongoose');

// Retrieve the registered User model.
const User = mongoose.model('users');

// Register a new user account.
const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Require all registration fields.
  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'All fields are required.'
    });
  }

  try {
    // Prevent duplicate accounts with the same email address.
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists.'
      });
    }

    // Create the account and securely hash its password.
    const user = new User({
      name: name.trim(),
      email: normalizedEmail
    });

    user.setPassword(password);
    await user.save();

    // Return a JWT after successful registration.
    return res.status(201).json({
      token: user.generateJWT()
    });
  } catch (err) {
    console.error('Registration error:', err);

    return res.status(500).json({
      message: 'Unable to register user.'
    });
  }
};

// Authenticate an existing user.
const login = (req, res, next) => {
  // Require both credentials before invoking Passport.
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      message: 'Email and password are required.'
    });
  }

  // Passport validates credentials using our Local Strategy.
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: info?.message || 'Invalid credentials.'
      });
    }

    // Return a signed JWT after successful authentication.
    return res.status(200).json({
      token: user.generateJWT()
    });
  })(req, res, next);
};

module.exports = {
  register,
  login
};
