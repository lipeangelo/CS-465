const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');

// Retrieve the User model registered in the database configuration.
const User = mongoose.model('users');

// Configure Passport to authenticate using an email address.
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find the user associated with the submitted email.
      const user = await User.findOne({ email });

      // Reject authentication when the user does not exist.
      if (!user) {
        return done(null, false, {
          message: 'Incorrect email or password.'
        });
      }

      // Verify the password against the stored password hash.
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Incorrect email or password.'
        });
      }

      // Authentication succeeded.
      return done(null, user);
    } catch (err) {
      // Forward unexpected database errors to Passport.
      return done(err);
    }
  }
));

module.exports = passport;
