
const express = require('express');
const router = express.Router();
const tripsController = require('../controllers/trips');

// GET all trips and POST a new trip
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

// GET, UPDATE, and DELETE a specific trip
router
  .route('/trips/:tripCode')
  .get(tripsController.tripsFindByCode)
  .put(tripsController.tripsUpdateTrip)
  .delete(tripsController.tripsDeleteTrip);

module.exports = router;
