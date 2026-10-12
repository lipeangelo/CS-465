
const mongoose = require('mongoose');
const Model = mongoose.model('trips');

// GET: /api/trips - Retrieve all trips
const tripsList = async (req, res) => {
  try {
    const trips = await Model.find({}).exec();

    return res.status(200).json(trips);
  } catch (err) {
    console.error('Error retrieving trips:', err);

    return res.status(500).json({
      message: 'Error retrieving trips'
    });
  }
};

// GET: /api/trips/:tripCode - Retrieve a specific trip
const tripsFindByCode = async (req, res) => {
  try {
    const trips = await Model.find({
      code: req.params.tripCode
    }).exec();

    if (!trips || trips.length === 0) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    return res.status(200).json(trips);
  } catch (err) {
    console.error('Error retrieving trip:', err);

    return res.status(500).json({
      message: 'Error retrieving trip'
    });
  }
};

// POST: /api/trips - Create a new trip
const tripsAddTrip = async (req, res) => {
  try {
    const {
      code,
      name,
      length,
      start,
      resort,
      perPerson,
      image,
      description
    } = req.body;

    // Validate required fields
    if (
      !code || !name || !length || !start ||
      !resort || perPerson === undefined ||
      perPerson === null || perPerson === '' ||
      !image || !description
    ) {
      return res.status(400).json({
        message: 'All trip fields are required'
      });
    }

    // Check for duplicate trip codes
    const existingTrip = await Model.findOne({ code });

    if (existingTrip) {
      return res.status(409).json({
        message: 'A trip with this code already exists'
      });
    }

    // Create and save the new trip
    const newTrip = await Model.create({
      code,
      name,
      length,
      start,
      resort,
      perPerson,
      image,
      description
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    console.error('Error adding trip:', err);

    if (
      err.name === 'ValidationError' ||
      err.name === 'CastError'
    ) {
      return res.status(400).json({
        message: 'Invalid trip data'
      });
    }

    if (err.code === 11000) {
      return res.status(409).json({
        message: 'A trip with this code already exists'
      });
    }

    return res.status(500).json({
      message: 'Error adding trip'
    });
  }
};

// PUT: /api/trips/:tripCode - Update an existing trip
const tripsUpdateTrip = async (req, res) => {
  try {
    const {
      name,
      length,
      start,
      resort,
      perPerson,
      image,
      description
    } = req.body;

    // Find and update the trip using its code
    const updatedTrip = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        $set: {
          name,
          length,
          start,
          resort,
          perPerson,
          image,
          description
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    // Return 404 if the trip does not exist
    if (!updatedTrip) {
      return res.status(404).json({
        message: 'Trip not found'
      });
    }

    // Return the updated trip
    return res.status(200).json(updatedTrip);

  } catch (err) {
    console.error('Error updating trip:', err);

    if (
      err.name === 'ValidationError' ||
      err.name === 'CastError'
    ) {
      return res.status(400).json({
        message: 'Invalid trip data'
      });
    }

    return res.status(500).json({
      message: 'Error updating trip'
    });
  }
};

// Export controller functions
module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};
