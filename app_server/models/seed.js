const mongoose = require('./db');
const trips = require('../../data/trips.json');
const Trip = require('./travlr');

const seedDB = async () => {
  await Trip.deleteMany({});
  await Trip.insertMany(trips);
};

seedDB().then(async () => {
  await mongoose.connection.close();
  process.exit(0);
});
