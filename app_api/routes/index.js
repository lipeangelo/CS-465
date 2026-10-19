const express = require('express');
const { expressjwt: jwt } = require('express-jwt');

const router = express.Router();

const tripsController = require('../controllers/trips');
const authenticationController = require('../controllers/authentication');

// Verify the JWT supplied in the Authorization: Bearer header.
// Requests without a valid token cannot modify trip data.
const authenticateJWT = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256']
});

// Public authentication endpoints.
// Registration creates an account; login returns a signed JWT.
router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

// Public GET endpoint; protected POST endpoint.
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(authenticateJWT, tripsController.tripsAddTrip);

// Public GET endpoint; protected UPDATE and DELETE endpoints.
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(authenticateJWT, tripsController.tripsUpdateTrip)
  .delete(authenticateJWT, tripsController.tripsDeleteTrip);

module.exports = router;
